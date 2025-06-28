// filepath: c:\Trabajo\barber-shop\src\Productos\Controller\Producto.ts
import apiClient from "../../pages/apiClient";
import { Producto, ProductoCreate } from "../Model/Producto";
import { ApiResponse } from "../Model/ApiResponse";
import { AxiosResponse } from 'axios';
const BASE = "/api/Producto";


import { ProductoApiResult } from "../Model/ProductoApiResult"; 

export const getAllProductos = async (): Promise<Producto[]> => {
    try {
      const res: ApiResponse<ProductoApiResult> = await apiClient.get(`${BASE}/FindAllProductos`);
      
      console.log("✅ Respuesta completa:", res);
  
      if (res.success && Array.isArray(res.result?.data)) {
        return res.result.data;
      } else {
        console.error("Estructura inesperada o success=false:", res);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener productos desde la API:", error);
      return [];
    }
  };
  
  export const addProducto = (data: ProductoCreate) =>
    apiClient.put(`${BASE}/AddProductos`, data);

//export const addProducto = (data: Producto) =>
 //   apiClient.put(`${BASE}/AddProductos`, data);

export const updateProducto = (data: Producto) =>
    apiClient.post(`${BASE}/UpdateProductos`, data);

export const deleteProducto = (id: string) =>
    apiClient.delete(`${BASE}/DeleteProductos/${id}`);