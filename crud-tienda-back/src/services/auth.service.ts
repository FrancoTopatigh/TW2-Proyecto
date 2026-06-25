//import bcrypt from 'bcrypt';
import type { UsuarioRepository } from '../repository/usuario.repository.js';
import type { Usuario } from '../models/usuario.model.js';
import { encrypt } from '../utils/bcrypt.js';
import { ValidationError } from '../utils/validation-error.js';

export class AuthService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async registrarUsuario(usuario: Usuario) {
    const nombre = usuario.nombre?.trim();
    const apellido = usuario.apellido?.trim();
    const email = usuario.email?.trim();
    const direccion = usuario.direccion?.trim();
    const contrasena = usuario.contrasena;

    if (!nombre || typeof nombre !== "string") throw new ValidationError('El nombre es obligatorio');
    if (!apellido || typeof apellido !== "string") throw new ValidationError('El apellido es obligatorio');
    if (!direccion || typeof direccion !== "string") throw new ValidationError('La dirección es obligatoria');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new ValidationError('Formato de email inválido');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!contrasena || !passwordRegex.test(contrasena)) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
    }

    const usuarioExistente = await this.usuarioRepository.findUsuarioByEmail(email);
    if (usuarioExistente) {
      throw new ValidationError('Email inválido, ya está en uso',409);
    }

    const hashPassword = await encrypt(contrasena);

    const nuevoUsuario = await this.usuarioRepository.createUsuario({
      email,contrasena: hashPassword,nombre,apellido,direccion
    });

    const { contrasena: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }

}