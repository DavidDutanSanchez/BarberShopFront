import apiClient from "../../pages/apiClient";
import { Persona } from "../Model/Persona";
import { ApiResponse } from "../Model/ApiResponse"; 
import { PersonaApiResult } from "../Model/PersonaApiResult";

const BASE = "/api/Personas";



export const getAllPersonas = async (): Promise<Persona[]> => {
    try {
      //const response = await apiClient.get<ApiResponse<Persona[]>>(`${BASE}/FindAllPersonas`);
      const res: ApiResponse<PersonaApiResult> = await apiClient.get(`${BASE}/FindAllPersonas`);
  
      console.log("Respuesta completa:", res);
  
      const personas = res.result?.data;
  
      if (Array.isArray(personas)) {
        return personas;
      } else {
        console.error("Estructura inesperada en result.data:", res);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener personas:", error);
      return [];
    }
  };

export const addPersona = async (persona: Omit<Persona, "idPersona">) => {
  return apiClient.put(`${BASE}/AddPersona`, persona);
};

export const updatePersona = async (persona: Persona) => {
  return apiClient.post(`${BASE}/UpdatePersona`, persona);
};

export const deletePersona = async (id: string) => {
  return apiClient.delete(`${BASE}/DeletePersona/${id}`);
};
