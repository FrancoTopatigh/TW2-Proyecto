import type { Usuario } from '../models/usuario.model.js';
import { prisma } from '../prisma.js';

export class UsuarioRepository {

  async findUsuarioByEmail(email: string) {
    return await prisma.usuario.findUnique({
        where: { email }
    });
  }

  async findUsuarioById(id: number) {
    return await prisma.usuario.findUnique({
      where: { id }
    });
  }

  async createUsuario(data: { nombre: string; apellido: string; email: string; contrasena: string; direccion: string }) {
    return await prisma.usuario.create(
        {
            data
        }
    );
  }

}