import axios from "axios";
import { Producto } from "../Model/Producto"; 


const API_BASE = "/api/Personas";

export const getAllProductos = () => axios.get<Producto[]>(`${API_BASE}/FindAllProductos`);
export const addProducto = (data: Producto) => axios.put(`${API_BASE}/AddProductos`, data);
export const updateProducto = (data: Producto) => axios.post(`${API_BASE}/UpdateProductos`, data);
export const deleteProducto = (id: string) => axios.delete(`${API_BASE}/DeleteProductos/${id}`);
