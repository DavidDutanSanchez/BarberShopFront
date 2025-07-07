import { ReporteTicket } from "../Modelo/ReporteTicket";
import { httpClient } from "../../services/HttpClient/HttpClient";
import { IHttpClientRequestParams } from "../../services/HttpClient/types";
import queryString from "query-string";
import { GlobalQueryParams } from "../../Dtos/QueryParams";
import { PaginationDto } from "../../Dtos/PaginationDto";


export const getReporteTickets = async (params: GlobalQueryParams<ReporteTicket>) => {
  const parameters: IHttpClientRequestParams<ReporteTicket[]> = {
    url: `/ControladorReporte/ReporteTickets?${queryString.stringify(params)}`,
    
  }
  return httpClient.get<PaginationDto<ReporteTicket>>(parameters)
}
