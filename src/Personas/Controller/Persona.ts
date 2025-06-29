import { Persona } from "../Model/Persona";
import { httpClient } from "../../services/HttpClient/HttpClient";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { PaginationDto } from "../../Dtos/PaginationDto";
import queryString from 'query-string'

export const getAllPersonas = async (params: GlobalQueryParams<Persona>) => {
  const parameters: IHttpClientRequestParams<Persona[]> = {
    url: `/Personas/FindAllPersonas?${queryString.stringify(params)}`,
  }
  return httpClient.get<PaginationDto<Persona>>(parameters)
}

export const addPersona = async (params: RequestParams<Persona>) => {
  const parameters: IHttpClientRequestParams<Persona> = {
    url: '/Personas/AddPersona',
    ...params,
  }
  return httpClient.put<Persona, string>(parameters)
}

export const updatePersona = async (params: RequestParams<Persona>) => {
  const parameters: IHttpClientRequestParams<Persona> = {
    url: `/Personas/UpdatePersona/`,
    ...params,
  }
  return httpClient.post<Persona, string>(parameters)
}

export const deletePersona = async (code: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/Personas/DeletePersona/${code}`,
  }
  return httpClient.delete(parameters)
}
