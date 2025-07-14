import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  GenericFormData,
  Method,
  toFormData,
} from 'axios'
import { IHttpClient, IHttpClientRequestParams } from './types'
import { DefaultResponseDto, ValidationResultDto } from '../../Dtos/DefaultResponseDto'
import { UseFormSetError } from 'react-hook-form'

//axios.defaults.baseURL = '/api'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

axios.defaults.timeout = 30000

class HttpClient implements IHttpClient {
  constructor() {}
  get<R>(parameters: IHttpClientRequestParams): Promise<R> {
    return this.request('GET', parameters)
  }
  post<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    return this.request('POST', parameters)
  }
  postAsFormData<T extends object, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    const { payload, body, ...restParams } = parameters
    const formData = toFormData(payload!, undefined, { indexes: null })
    const newParams: IHttpClientRequestParams<GenericFormData> = {
      ...restParams,
      payload: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return this.post<GenericFormData, R>(newParams)
  }
  delete<R>(parameters: IHttpClientRequestParams): Promise<R> {
    return this.request('DELETE', parameters)
  }
  put<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    return this.request('PUT', parameters)
  }
  request<T, R>(method: Method, parameters: IHttpClientRequestParams<T>): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      // extract the individual parameters
      const {
        url,
        payload,
        requiresToken,
        customToken,
        responseType,
        cancelToken,
        withCredentials = true,
        headers,
        setError,
      } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: headers ?? {
          'Content-Type': 'application/json',
        },
        responseType,
        cancelToken,
        withCredentials,
      }

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = customToken
        options.headers!.Authorization = `${import.meta.env.VITE_API_AUTHORIZATION_PREFIX} ${token}`
      }

      // finally execute the GET request with axios:
      axios
        .request<T, AxiosResponse<DefaultResponseDto<R>>>({
          method,
          url,
          data: payload,
          ...options,
        })
        .then((response) => {
          // check if the response is blob and return it as is
          if (responseType === 'blob') {
            resolve(response.data as R)
          } else {
            resolve(response.data.result as R)
          }
        })
        .catch(async (error) => {
          // do not reject if the request was canceled
          if (error.code !== 'ERR_CANCELED') {
            const { response } = error
            if (response?.data && response?.data instanceof Blob) {
              const text = await response.data.text()
              error.response.data = JSON.parse(text) as DefaultResponseDto<R | ValidationResultDto<R>>
            }
            reject(errorResponseHandler<R>(error, setError))
          }
        })
    })
  }
}

const errorResponseHandler = <T>(
  error: AxiosError<DefaultResponseDto<T | ValidationResultDto<T>>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>,
): DefaultResponseDto<T | ValidationResultDto<T>> => {
  const { response } = error
  if (response) {
    if (response.data) {
      const { result } = response.data as DefaultResponseDto<ValidationResultDto<T>>
      if (result?.errors && setError) {
        const { errors } = response.data.result as ValidationResultDto<T>
        Object.entries(errors as object).forEach(([name, value]) => {
          setError(name as string, { message: value.join(', ') })
        })
      }
      return response.data
    }
    return {
      success: false,
      code: error.code,
      message: `Hubo un error al procesar su requerimiento (${response.status})`,
      result: error as never,
    }
  }
  return {
    success: false,
    code: error.code,
    message: error.message,
    result: error as never,
  }
}

export const httpClient = new HttpClient()
