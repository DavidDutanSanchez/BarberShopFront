import { Persona } from "../../Personas/Model/Persona";

export interface Usuario {
    idUsuarios: string;
    usuario: string;
    contraseniaUsuarios: string;
    permisosUsuarios: string;
    _persona_id: string;
    personaNombreCompleto?: string; 
  }
  