import { Router } from "express";

const router = new Router()

import CadastrarUsuarioController from "../controller/auth/cadastrarUsuariosController.js";
import loginUsuariosController from "../controller/auth/loginUsuariosController.js";

router.post('/cadastrar', CadastrarUsuarioController.create)
router.post('/login', loginUsuariosController.store)

export default router