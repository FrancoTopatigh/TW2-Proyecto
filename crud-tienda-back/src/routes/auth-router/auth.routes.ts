import { Router } from "express";
import { AuthController } from "../../controller/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

// Rutas POST para autenticación
authRouter.post('/auth/signup', authController.registrarUsuario.bind(authController));
authRouter.post('/auth/signin', authController.iniciarSesion.bind(authController));

export default authRouter;