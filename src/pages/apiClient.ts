import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
    private client: AxiosInstance;
  
    constructor(baseURL: string) {
      this.client = axios.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // 👉 Aquí pones el token por defecto manualmente
      this.client.interceptors.request.use((config) => {
        const token = "TuClaveSuperSecreta1234567890"; // ⚠️ Tu token JWT aquí
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return this.client.get(url, config).then(res => res.data);
    }
  
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return this.client.post(url, data, config).then(res => res.data);
    }
  
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      return this.client.put(url, data, config).then(res => res.data);
    }
  
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return this.client.delete(url, config).then(res => res.data);
    }
  }
  

//export default new ApiClient("https://localhost:7172");
export default new ApiClient("http://localhost:5151");

