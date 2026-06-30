import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/authorize.middleware.js";

const productoRouter = Router();    

const productoController = new ProductoController();

productoRouter.get('/', productoController.TraerProductos);
productoRouter.get('/:id', productoController.TraerProductoPorId);
productoRouter.post('/', authMiddleware, authorizeRoles('ADMIN'), productoController.CrearProducto);
productoRouter.put('/:id',authMiddleware, authorizeRoles('ADMIN'), productoController.ActualizarProducto);
productoRouter.delete('/:id',authMiddleware, authorizeRoles('ADMIN'), productoController.EliminarProducto);

export default productoRouter;