import { Router } from "express";
import { AuthController } from "../../controller/auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter = Router();
const authController = new AuthController();

// Rutas POST para autenticación
authRouter.post('/auth/signup', authController.registrarUsuario.bind(authController));
authRouter.post('/auth/signin', authController.iniciarSesion.bind(authController));

// Ruta protegida para obtener el usuario actual
authRouter.get('/auth/me', authMiddleware, authController.obtenerUsuarioActual.bind(authController));

export default authRouter;