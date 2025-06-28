import { Persona } from "./Persona";


export interface PersonaApiResult {
    data: Persona[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    total: number;
  }
  

  