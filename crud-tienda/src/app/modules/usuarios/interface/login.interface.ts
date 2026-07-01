import { Usuario } from "./usuario.interface.rest";

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
