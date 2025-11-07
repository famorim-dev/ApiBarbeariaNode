import { Router } from "express";

const router = new Router()

import VerificaToken from '../middleware/verificaToken.js'
import buscarServicoController from "../controller/agendamento/buscarServicoController.js";

router.get('/buscar/servico',VerificaToken, buscarServicoController.index)

export default router