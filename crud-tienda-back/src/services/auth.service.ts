//import bcrypt from 'bcrypt';
import type { UsuarioRepository } from '../repository/usuario.repository.js';
import type { Usuario } from '../models/usuario.model.js';
import { encrypt } from '../utils/bcrypt.js';

export class AuthService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async registrarUsuario(usuario: Usuario) {
    const { email, contrasena, nombre, apellido, direccion} = usuario;

    if (!nombre || typeof nombre !== "string") throw new Error('El nombre es obligatorio');
    if (!apellido || typeof apellido !== "string") throw new Error('El apellido es obligatorio');
    if (!direccion || typeof direccion !== "string") throw new Error('La dirección es obligatoria');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Formato de email inválido');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!contrasena || !passwordRegex.test(contrasena)) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
    }

    const usuarioExistente = await this.usuarioRepository.findUsuarioByEmail(email);
    if (usuarioExistente) {
      throw new Error('Email inválido, ya está en uso');
    }

    const hashPassword = await encrypt(contrasena);

    const nuevoUsuario = await this.usuarioRepository.createUsuario({
      email,contrasena: hashPassword,nombre,apellido,direccion
    });

    const { contrasena: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }

}