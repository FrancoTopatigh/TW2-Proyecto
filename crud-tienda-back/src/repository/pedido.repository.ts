import { prisma } from '../prisma.js'; 
import type { Pedido } from '../models/pedido.model.ts'; 

export class PedidoRepository {
  
  constructor() { }

  // Método para guardar en la base de datos usando Prisma
  public async crearPedido(usuarioId: number, total: number, productos: any[]) {
    // Prisma maneja la inserción en ambas tablas automáticamente
    const nuevoPedido = await prisma.pedido.create({
      data: {
        usuarioId: usuarioId,
        total: total,
        productos: {
          create: productos.map(p => ({
            productoId: p.productoId,
            cantidad: p.cantidad,
            precio: p.precio
          }))
        }
      },
      include: {
        productos: true
      }
    });

    return nuevoPedido;
  }
}