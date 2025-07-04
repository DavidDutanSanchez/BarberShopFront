import { Files } from "../Model/Files";
import { httpClient } from "../../services/HttpClient/HttpClient";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { PaginationDto } from "../../Dtos/PaginationDto";
import queryString from 'query-string';

export const getAllFiles = async (params: GlobalQueryParams<Files>) => {
  const parameters: IHttpClientRequestParams<Files[]> = {
    url: `/File/FindAllFiles?${queryString.stringify(params)}`
  }
  return httpClient.get<PaginationDto<Files>>(parameters);
};

export const addFile = async (params: RequestParams<Files>) => {
  const parameters: IHttpClientRequestParams<Files> = {
    url: "/File/AddFiles",
    ...params
  };
  return httpClient.put<Files, string>(parameters);
};

export const updateFile = async (params: RequestParams<Files>) => {
  const parameters: IHttpClientRequestParams<Files> = {
    url: "/File/UpdateFiles",
    ...params
  };
  return httpClient.post<Files, string>(parameters);
};

export const deleteFile = async (id: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/File/DeleteFiles/${id}`
  };
  return httpClient.delete(parameters);
};
