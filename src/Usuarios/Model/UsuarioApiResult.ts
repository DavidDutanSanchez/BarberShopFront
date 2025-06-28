import { Usuario } from "./Usuario";

export interface UsuarioApiResult {
    data: Usuario[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    total: number;
  }
  

  