import { Router } from "express";
import productoRouter from "./producto-router/producto.routes.js";
import authRouter from "./auth-router/auth.routes.js";
import pedidoRouter from "./pedido-router/pedido.routes.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/productos", productoRouter);
        router.use("/api", authRouter);
        router.use("/api/pedidos", pedidoRouter);

        return router;
    }
}