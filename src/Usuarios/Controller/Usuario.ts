import queryString from "query-string";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { Usuario } from "../Model/Usuario";
import { PaginationDto } from "../../Dtos/PaginationDto";
import { httpClient } from "../../services/HttpClient/HttpClient";

export const getAllUsuarios = async (params: GlobalQueryParams<Usuario>) => {
  const parameters: IHttpClientRequestParams<Usuario[]> = {
    url: `/Usuario/FindAllUsuarios?${queryString.stringify(params)}`,
  }
  return httpClient.get<PaginationDto<Usuario>>(parameters)
}

export const addUsuario = async (params: RequestParams<Usuario>) => {
  const parameters: IHttpClientRequestParams<Usuario> = {
    url: '/Usuario/AddUsuarios',
    ...params,
  }
  return httpClient.put<Usuario, string>(parameters)
}

export const updateUsuario = async (params: RequestParams<Usuario>) => {
  const parameters: IHttpClientRequestParams<Usuario> = {
    url: `/Usuario/UpdateUsuarios/`,
    ...params,
  }
  return httpClient.post<Usuario, string>(parameters)
}

export const deleteUsuario = async (code: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/Usuario/DeleteUsuarios/${code}`,
  }
  return httpClient.delete(parameters)
}
