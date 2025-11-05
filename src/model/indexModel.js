import { Sequelize } from "sequelize";
import Banco from "../config/db.js"

import Usuarios from "./usuarioModel.js";
import Disponibilidade from "./disponibilidadeModel.js";

const models = [Usuarios, Disponibilidade]
const conexao = new Sequelize(Banco)

models.forEach((model) => model.init(conexao))

export default conexao