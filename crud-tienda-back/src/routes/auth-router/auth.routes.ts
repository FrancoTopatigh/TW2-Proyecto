import { Router } from "express";
import { AuthController } from "../../controller/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

// Ruta POST para registrar usuarios
authRouter.post('/auth/signup', authController.registrarUsuario.bind(authController));

export default authRouter;