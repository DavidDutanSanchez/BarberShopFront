import { AxiosRequestConfig, ResponseType } from 'axios'
import { UseFormSetError } from 'react-hook-form'

export interface IHttpClientRequestParams<T = unknown> extends RequestParams<T> {
  url: string
}

export interface RequestParams<T = unknown>
  extends Pick<AxiosRequestConfig, 'cancelToken' | 'withCredentials' | 'headers' | 'onUploadProgress'> {
  requiresToken?: boolean
  customToken?: string | undefined | null
  payload?: T
  body?: T; 
  responseType?: ResponseType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>
}

export interface IHttpClient {
  get<R>(parameters: IHttpClientRequestParams): Promise<R>
  post<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
  postAsFormData<T extends object, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
  delete<R>(parameters: IHttpClientRequestParams): Promise<R>
  put<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
}
