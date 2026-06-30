import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { UsuarioRepository } from '../repository/usuario.repository.js';
import type { Usuario } from '../models/usuario.model.js';
import { encrypt } from '../utils/bcrypt.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.config.js';
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

  async iniciarSesion(email: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findUsuarioByEmail(email);
    if (!usuario) {
      throw new Error('Usuario inválido');
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      throw new Error('Contraseña inválida');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email,role: usuario.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { contrasena: _, ...usuarioSinPassword } = usuario;
    return { token, usuario: usuarioSinPassword };
  }

  async obtenerUsuarioActual(id: number) {
    const usuario = await this.usuarioRepository.findUsuarioById(id);
    if (!usuario) {
      throw new ValidationError('Usuario no encontrado', 404);
    }
    const { contrasena: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  }

}