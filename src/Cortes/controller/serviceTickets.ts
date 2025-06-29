import { httpClient } from "../../services/HttpClient/HttpClient";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { IHttpClientRequestParams, RequestParams } from "../../services/HttpClient/types";
import { PaginationDto } from "../../Dtos/PaginationDto";
import queryString from 'query-string'
import { ticketsCabeceraDto } from "../model/ticketsDto";

export const getAllTickets = async (params: GlobalQueryParams<ticketsCabeceraDto>) => {
  const parameters: IHttpClientRequestParams<ticketsCabeceraDto[]> = {
    url: `/Ticket/FindAllTicketsCabecera?${queryString.stringify(params)}`,
  }
  return httpClient.get<PaginationDto<ticketsCabeceraDto>>(parameters)
}

export const addTicket = async (params: RequestParams<ticketsCabeceraDto>) => {
  const parameters: IHttpClientRequestParams<ticketsCabeceraDto> = {
    url: '/Ticket/AddTicketsCabecera/',
    ...params,
  }
  return httpClient.put<ticketsCabeceraDto, string>(parameters)
}

export const updateTicket = async (params: RequestParams<ticketsCabeceraDto>) => {
  const parameters: IHttpClientRequestParams<ticketsCabeceraDto> = {
    url: `/Ticket/UpdateTicketsCabecera/`,
    ...params,
  }
  return httpClient.post<ticketsCabeceraDto, string>(parameters)
}

export const deleteTicket = async (code: string) => {
  const parameters: IHttpClientRequestParams = {
    url: `/Ticket/DeleteTicketCabecera/${code}`,
  }
  return httpClient.delete(parameters)
}
