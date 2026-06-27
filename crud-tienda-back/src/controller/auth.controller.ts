import { type Request, type Response } from 'express';
import { UsuarioRepository } from '../repository/usuario.repository.js';
import { AuthService } from '../services/auth.service.js';
import type { Usuario } from '../models/usuario.model.js';
import { ValidationError } from '../utils/validation-error.js';

const usuarioRepository = new UsuarioRepository();
const usuarioService = new AuthService(usuarioRepository);

export class AuthController {

    constructor() { }

    public registrarUsuario = async (req: Request, res: Response) => {
    try {
      const newUsuario: Usuario = req.body;
      const usuario = await usuarioService.registrarUsuario(newUsuario);

      return res.status(201).json(usuario);
    } catch (error: any) {

      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      console.error("Hubo un error inesperado en registrarUsuario:", error);

      return res.status(500).json({ message: "Hubo un error, no se pudo crear el usuario"});
    }
  }

  public iniciarSesion = async (req: Request, res: Response) => {
    try {
      const { email, contrasena } = req.body;
      if (!email || !contrasena) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
      }

      const resultado = await usuarioService.iniciarSesion(email, contrasena);
      return res.status(200).json(resultado);
    } catch (error: any) {
      if (error.message === 'Usuario inválido' || error.message === 'Contraseña inválida') {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
  }

  public obtenerUsuarioActual = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' });
      }

      const usuario = await usuarioService.obtenerUsuarioActual(req.user.id);
      return res.status(200).json(usuario);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error al obtener el usuario actual', error: error.message });
    }
  }
}