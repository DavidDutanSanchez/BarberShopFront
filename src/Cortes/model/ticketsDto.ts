import { Persona } from "../../Personas/Model/Persona"
import { Producto } from "../../Productos/Model/Producto"
import { ServicioDto } from "../../Servicios/Model/Servicio"

export interface ticketsCabeceraDto {
  idTickets: string
  fechaTicket: Date
  estadoTicketCab: boolean
  totalTicketCab: number
  _usuario_id: string
  persona?: Persona
  detalle_tickets?: ticketsDetalleDto[]
}

export interface ticketsDetalleDto {
  idTicketsDetalle: string
  subTotalTicketDet: number
  fechaTicketDet: Date
  cantidadTicketDet: number
  _ticket_cabecera: string
  _servicio_id?: string
  _producto_id?: string
  servicios?: ServicioDto
  prodcutos?: Producto
}