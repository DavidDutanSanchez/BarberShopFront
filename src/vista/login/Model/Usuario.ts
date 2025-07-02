export interface UsuarioLogin {
    usuario: string;
    contrasenia: string;
  }
  
  export interface UsuarioResponse {
    success: boolean;
    message: string;
    usuario: string;
    permisos: string;
    id: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    result: T;
  }
  