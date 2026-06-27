import { type Request, type Response } from 'express';
import { PedidoRepository } from '../repository/pedido.repository.js';
import { PedidoService } from '../services/pedido.service.js';


const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(pedidoRepository);

export class PedidoController {
  
  constructor() { }
  
  public registrarPedido = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productos, total } = req.body;
      
      const pedido = await pedidoService.registrarPedido(usuarioId, total, productos);

      // Devuelve la respuesta exitosa a Angular
      return res.status(201).json({ message: "Compra confirmada con éxito", pedido });
      
    } catch (error: any) {
      
      // Captura los errores lanzados por el Servicio (simulando la lógica del auth.controller)
      if (error.message.includes('obligatorio') || error.message.includes('inválido') || error.message.includes('vacío')) {
        return res.status(400).json({ message: error.message });
      }
      
      // Error genérico de servidor
      return res.status(500).json({ message: "No se pudo registrar el pedido", error: error.message });
    }
  }
}