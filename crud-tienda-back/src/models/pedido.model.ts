
export class PedidoDetalle {
  id?: number;
  pedidoId!: number;
  productoId!: number;
  cantidad!: number;
  precio!: number;
}

export class Pedido {
  id?: number;
  usuarioId!: number;
  total!: number;
  fecha!: Date;
  productos!: PedidoDetalle[];
}