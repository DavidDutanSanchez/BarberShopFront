import { File } from "../Model/Files";
import { httpClient } from "../../services/HttpClient/HttpClient";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { PaginationDto } from "../../Dtos/PaginationDto";
import queryString from 'query-string';

export const getAllFiles = async (params: GlobalQueryParams<File>) => {
  const parameters: IHttpClientRequestParams<File[]> = {
    url: `/File/FindAllFiles?${queryString.stringify(params)}`
  }
  return httpClient.get<PaginationDto<File>>(parameters);
};

export const addFile = async (params: RequestParams<File>) => {
  const parameters: IHttpClientRequestParams<File> = {
    url: "/File/AddFiles",
    ...params
  };
  return httpClient.put<File, string>(parameters);
};

export const updateFile = async (params: RequestParams<File>) => {
  const parameters: IHttpClientRequestParams<File> = {
    url: "/File/UpdateFiles",
    ...params
  };
  return httpClient.post<File, string>(parameters);
};

export const deleteFile = async (id: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/File/DeleteFiles/${id}`
  };
  return httpClient.delete(parameters);
};
