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
}