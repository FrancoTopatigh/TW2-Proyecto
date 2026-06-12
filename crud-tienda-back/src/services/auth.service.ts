import bcrypt from 'bcrypt';
import type { UsuarioRepository } from '../repository/usuario.repository.js';
import type { Usuario } from '../models/usuario.model.js';
import { BCRYPT_SALT_ROUNDS } from '../config/bcript.config.js';

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

    if (!contrasena || contrasena.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const usuarioExistente = await this.usuarioRepository.findUsuarioByEmail(email);
    if (usuarioExistente) {
      throw new Error('Email inválido, ya está en uso');
    }

    const hashPassword = await bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS);

    const nuevoUsuario = await this.usuarioRepository.createUsuario({
      email,contrasena: hashPassword,nombre,apellido,direccion
    });

    const { contrasena: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }

}