import { httpClient } from "../../../services/HttpClient/HttpClient";
import { IHttpClientRequestParams, RequestParams } from "../../../services/HttpClient/types";
import { Usuario } from "../../../Usuarios/Model/Usuario";
import { UsuarioLogin } from "../Model/Usuario";

export const loginUsuario = async (params: RequestParams<UsuarioLogin>) => {
  const parameters: IHttpClientRequestParams<UsuarioLogin> = {
    url: "/Usuario/Login",
    ...params,
  };

  return httpClient.post<UsuarioLogin, Usuario>(parameters);
};