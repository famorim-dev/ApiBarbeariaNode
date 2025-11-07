import express from 'express'
import cors from 'cors'

// import rotas
import authRotas from "./src/routes/usuarioRouter.js"
import agendaRotas from "./src/routes/agendamentoRouter.js"

class App{
    constructor() {
        this.app = express()
        this.middleware()
        this.router()
    }
    middleware() {
        this.app.use(express.json())
        this.app.use(cors())
    }
    router() {
        this.app.use('/auth', authRotas)
        this.app.use('/agenda', agendaRotas)
    }
}

export default new App().app