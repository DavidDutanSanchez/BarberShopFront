export interface Producto {
  
  idproductos: string;
  nombreProducto: string;
  costroProducto: number;
  stockProducto: number;
  ivaProducto: number;
  codigoProducto: string;
  detalle_tickets: any;
}
export type ProductoCreate = Omit<Producto, "idproductos">;


export interface ProductoApiResult {
  data: Producto[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
