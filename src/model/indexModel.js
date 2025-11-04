import { Sequelize } from "sequelize";
import Banco from "../config/db.js"

import Usuarios from "./usuarioModel.js";

const models = [Usuarios]
const conexao = new Sequelize(Banco)

models.forEach((model) => model.init(conexao))

export default conexao