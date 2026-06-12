import { type Request, type Response } from 'express';
import { UsuarioRepository } from '../repository/usuario.repository.js';
import { AuthService } from '../services/auth.service.js';
import type { Usuario } from '../models/usuario.model.js';

const usuarioRepository = new UsuarioRepository();
const usuarioService = new AuthService(usuarioRepository);

export class AuthController {
  
    constructor() { }
    
    public registrarUsuario = async (req: Request, res: Response) => {
    try {
      const newUsuario: Usuario = req.body;
      const usuario = await usuarioService.registrarUsuario(newUsuario);

      return res.status(201).json({message: "Usuario registrado con éxito", user: usuario });
    } catch (error: any) {

      if (error.message === 'Email inválido, ya está en uso' || error.message.includes('obligatorio') || error.message.includes('inválido') || error.message.includes('caracteres')) {
        return res.status(400).json({ message: error.message });
      }
      
      return res.status(500).json({ message: "No se pudo crear el usuario", error: error.message });
    }
  }
}