import { Router } from "express";
import productoRouter from "./producto-router/producto.router.js";

export class AppRoutes {


    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", productoRouter);


        return router
    }

}