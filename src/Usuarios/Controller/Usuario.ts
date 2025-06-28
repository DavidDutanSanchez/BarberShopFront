import apiClient from "../../pages/apiClient";
import { ApiResponse } from "../Model/ApiResponse";
import { Usuario } from "../Model/Usuario";
import { UsuarioApiResult } from "../Model/UsuarioApiResult";


const BASE = "/api/Usuario";

export const getAllUsuarios = async (): Promise<Usuario[]> => {
    try {
      const res: ApiResponse<UsuarioApiResult> = await apiClient.get(`${BASE}/FindAllUsuarios`);
      
      console.log("✅ Respuesta completa:", res);
  
      if (res.success && Array.isArray(res.result?.data)) {
        return res.result.data;
      } else {
        console.error("Estructura inesperada o success=false:", res);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener Usuarios desde la API:", error);
      return [];
    }
  };

export const addUsuario = async (usuario: Omit<Usuario, "idUsuarios">) => {
  return apiClient.put(`${BASE}/AddUsuarios`, usuario);
};

export const updateUsuario = async (usuario: Usuario) => {
  return apiClient.post(`${BASE}/UpdateUsuarios`, usuario);
};

export const deleteUsuario = async (id: string) => {
  return apiClient.delete(`${BASE}/DeleteUsuarios/${id}`);
};
