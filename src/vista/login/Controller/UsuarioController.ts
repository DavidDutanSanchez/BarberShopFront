import { httpClient } from "../../../services/HttpClient/HttpClient";
import { IHttpClientRequestParams } from "../../../services/HttpClient/types";
import { ApiResponse, UsuarioLogin, UsuarioResponse } from "../Model/Usuario";

export const loginUsuario = async (loginData: UsuarioLogin) => {
  const parameters: IHttpClientRequestParams<UsuarioLogin> = {
    url: "/Usuario/Login",
    payload: loginData,
    requiresToken: false,
  };

  return httpClient.post<UsuarioLogin, ApiResponse<UsuarioResponse>>(parameters);
};
