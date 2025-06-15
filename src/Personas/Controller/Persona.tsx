import axios from "axios";
import { Persona } from "../Model/Persona";

const API_BASE = "/api/Personas";

export const getAllPersonas = () => axios.get<Persona[]>(`${API_BASE}/FindAllPersonas`);
export const addPersona = (data: Persona) => axios.put(`${API_BASE}/AddPersona`, data);
export const updatePersona = (data: Persona) => axios.post(`${API_BASE}/UpdatePersona`, data);
export const deletePersona = (id: string) => axios.delete(`${API_BASE}/DeletePersona/${id}`);
