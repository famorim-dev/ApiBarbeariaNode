import app from "../app.js"
import dotenv from 'dotenv'
import connection from './model/indexModel.js'
dotenv.config()
const porta = 3000

async function startServer() {
  try {
    await connection.authenticate();
    console.log('Sucesso ao conectar no banco');
    app.listen(porta, () => console.log(` Servidor rodando na porta ${porta}`));
  } catch (e) {
    console.error('Erro ao conectar no banco');
    process.exit(1);
  }
}

startServer()