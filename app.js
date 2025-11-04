import express from 'express'
import cors from 'cors'

// import rotas
import authRotas from "./src/routes/usuarioRouter.js"


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
    }
}

export default new App().app