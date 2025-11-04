import { Router } from "express";

const router = new Router()

import CadastrarUsuarioController from "../controller/auth/cadastrarUsuarios.js";

router.post('/cadastrar', CadastrarUsuarioController.create)

export default router