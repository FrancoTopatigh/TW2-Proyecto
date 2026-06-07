import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller.js";
const productoRouter = Router();    

const productoController = new ProductoController();

export default productoRouter;