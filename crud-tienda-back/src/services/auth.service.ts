import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { UsuarioRepository } from '../repository/usuario.repository.js';
import type { Usuario } from '../models/usuario.model.js';
import { encrypt } from '../utils/bcrypt.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.config.js';

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
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { contrasena: _, ...usuarioSinPassword } = usuario;
    return { token, usuario: usuarioSinPassword };
  }

}