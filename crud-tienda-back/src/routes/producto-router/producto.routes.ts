import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller.js";

const productoRouter = Router();    

const productoController = new ProductoController();

productoRouter.get('/', productoController.TraerProductos);
productoRouter.get('/:id', productoController.TraerProductoPorId);
productoRouter.post('/', productoController.CrearProducto);
productoRouter.put('/:id', productoController.ActualizarProducto);
productoRouter.delete('/:id', productoController.EliminarProducto);

export default productoRouter;