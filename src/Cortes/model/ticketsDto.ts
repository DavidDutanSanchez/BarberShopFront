export interface ticketsCabeceraDto {
  IdTickets: string
  FechaTicket: Date
  EstadoTicketCab: Number
  TotalTicketCab: Number
  _usuario_id: string
  detalle_tickets?: ticketsDetalleDto[]
}

export interface ticketsDetalleDto {
  IdTicketsDetalle: string
  SubTotalTicketDet: Number
  FechaTicketDet: Date
  _ticket_cabecera: string
  _servicio_id: string
  _producto_id: string
}