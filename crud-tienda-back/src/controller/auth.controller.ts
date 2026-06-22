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

      return res.status(201).json(usuario);
    } catch (error: any) {

    const validationErrors = [
      'El nombre es obligatorio',
      'El apellido es obligatorio',
      'La direccion es obligatoria',
      'Formato de email inválido',
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      'Email inválido, ya está en uso'
    ];
    
    if (validationErrors.includes(error.message)) {
      return res.status(400).json({ message: error.message });
    }
      
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
}