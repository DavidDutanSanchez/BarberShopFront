import { httpClient } from "../../services/HttpClient/HttpClient";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { PaginationDto } from "../../Dtos/PaginationDto";
import queryString from 'query-string'
import { ServicioDto } from "../Model/Servicio";

export const getAllService = async (params: GlobalQueryParams<ServicioDto>) => {
  const parameters: IHttpClientRequestParams<ServicioDto[]> = {
    url: `/Service/FindAllServicios?${queryString.stringify(params)}`,
  }
  return httpClient.get<PaginationDto<ServicioDto>>(parameters)
}

export const addService = async (params: RequestParams<ServicioDto>) => {
  const parameters: IHttpClientRequestParams<ServicioDto> = {
    url: '/Service/AddServicios',
    ...params,
  }
  return httpClient.put<ServicioDto, string>(parameters)
}

export const updateService = async (params: RequestParams<ServicioDto>) => {
  const parameters: IHttpClientRequestParams<ServicioDto> = {
    url: `/Service/UpdateServicios/`,
    ...params,
  }
  return httpClient.post<ServicioDto, string>(parameters)
}

export const deleteService = async (code: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/Service/DeleteServicios/${code}`,
  }
  return httpClient.delete(parameters)
}
