const BASE = "/api/Personas";

export const Endpoints = {
  Personas: {
    FindAll: `${BASE}/FindAllPersonas`,
    Add: `${BASE}/AddPersona`,
    Update: `${BASE}/UpdatePersona`,
    Delete: (id: string) => `${BASE}/DeletePersona/${id}`
  },

  Files: {
    FindAll: `${BASE}/FindAllFiles`,
    Add: `${BASE}/AddFiles`,
    Update: `${BASE}/UpdateFiles`,
    Delete: (id: number) => `${BASE}/DeleteFiles/${id}`
  },

  Productos: {
    FindAll: `${BASE}/FindAllProductos`,
    Add: `${BASE}/AddProductos`,
    Update: `${BASE}/UpdateProductos`,
    Delete: (id: string) => `${BASE}/DeleteProducto/${id}`
  },

  Servicios: {
    FindAll: `${BASE}/FindAllServicios`,
    Add: `${BASE}/AddServicios`,
    Update: `${BASE}/UpdateServicios`,
    Delete: (id: number) => `${BASE}/DeleteServicios/${id}`
  },

  TicketsCabecera: {
    FindAll: `${BASE}/FindAllTicketsCabecera`,
    Add: `${BASE}/AddTicketsCabecera`,
    Update: `${BASE}/UpdateTicketsCabecera`,
    Delete: (id: number) => `${BASE}/DeleteTicketCabecera/${id}`
  },

  TicketsDetalle: {
    FindAll: `${BASE}/FindAllTicketsDetalle`,
    Add: `${BASE}/AddTicketsDetalle`,
    Update: `${BASE}/UpdateTicketsDetalle`,
    Delete: (id: number) => `${BASE}/DeleteTicketDetalle/${id}`
  },

  Usuarios: {
    FindAll: `${BASE}/FindAllUsuarios`,
    Add: `${BASE}/AddUsuarios`,
    Update: `${BASE}/UpdateUsuarios`,
    Delete: (id: number) => `${BASE}/DeleteUsuarios/${id}`
  }
};
