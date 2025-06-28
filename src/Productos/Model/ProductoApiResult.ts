import { Producto } from "./Producto";

export interface ProductoApiResult {
    data: Producto[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    total: number;
  }
  

  