import { Router } from "express";

const router = new Router()

import CadastrarUsuarioController from "../controller/auth/cadastrarUsuariosController.js";
import loginUsuariosController from "../controller/auth/loginUsuariosController.js";
import CadastrarBarbeiroController from "../controller/auth/cadastrarBarbeiroController.js";
import VerificaToken from '../middleware/verificaToken.js'

router.post('/cadastrar', CadastrarUsuarioController.create)
router.post('/login', loginUsuariosController.store)
router.post('/cadastrar-barbeiro',VerificaToken, CadastrarBarbeiroController.store)

export default router