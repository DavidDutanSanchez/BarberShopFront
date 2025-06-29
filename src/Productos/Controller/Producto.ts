import { Producto } from "../Model/Producto";
import { httpClient } from "../../services/HttpClient/HttpClient";
import { PaginationDto } from "../../Dtos/PaginationDto";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import queryString from "query-string";
import { GlobalQueryParams } from "../../Dtos/QueryParams";

export const getAllProductos = async (params: GlobalQueryParams<Producto>) => {
  const parameters: IHttpClientRequestParams<Producto[]> = {
    url: `/Producto/FindAllProductos?${queryString.stringify(params)}`,
  }
  return httpClient.get<PaginationDto<Producto>>(parameters)
}

export const addProducto = async (params: RequestParams<Producto>) => {
  const parameters: IHttpClientRequestParams<Producto> = {
    url: '/Producto/AddProductos',
    ...params,
  }
  return httpClient.put<Producto, string>(parameters)
}

export const updateProducto = async (params: RequestParams<Producto>) => {
  const parameters: IHttpClientRequestParams<Producto> = {
    url: `/Producto/UpdateProductos/`,
    ...params,
  }
  return httpClient.post<Producto, string>(parameters)
}

export const deleteProducto = async (code: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/Producto/DeleteProductos/${code}`,
  }
  return httpClient.delete(parameters)
}