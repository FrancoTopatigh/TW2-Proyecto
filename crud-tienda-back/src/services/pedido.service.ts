import { PedidoRepository } from '../repository/pedido.repository.js';

export class PedidoService {
  
  constructor(private pedidoRepository: PedidoRepository) {}

  public async registrarPedido(usuarioId: number, total: number, productos: any[]) {
    
    // Validaciones de negocio
    if (!usuarioId) throw new Error("El ID de usuario es obligatorio");
    if (!total || total <= 0) throw new Error("El total del pedido es inválido");
    if (!productos || productos.length === 0) throw new Error("El carrito no puede estar vacío");

    
    const pedidoCreado = await this.pedidoRepository.crearPedido(usuarioId, total, productos);
    
    return pedidoCreado;
  }
}