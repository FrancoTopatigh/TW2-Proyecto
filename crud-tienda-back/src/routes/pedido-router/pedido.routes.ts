import { Router } from "express";
import { PedidoController } from "../../controller/pedido.controller.js"; 

const pedidoRouter = Router();
const pedidoController = new PedidoController();

// Ruta POST para registrar pedidos (copiando el uso de .bind() de tu compañero)
pedidoRouter.post('/', pedidoController.registrarPedido.bind(pedidoController));

export default pedidoRouter;