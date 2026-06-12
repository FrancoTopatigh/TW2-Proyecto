import { Router } from "express";
import productoRouter from "./producto-router/producto.router.js";
import authRouter from "./auth-router/auth.routes.js";
export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        //router.use("/api/productos", productoRouter);
        router.use("/api/auth", authRouter);

        return router
    }

}