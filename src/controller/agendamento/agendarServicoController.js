import jwt from 'jsonwebtoken'

class AgendarServicoController{
    async create(req, res){
        try{
            const token = req.headers.authorization

            if(!token){
                return res.status(401).json({message: "token Inválido"})
            }

            const [, tokenJwt] = token.split(' ')
            const verificaToken = jwt.verify(tokenJwt, process.env.TOKEN_SECRET)
            const user_id = verificaToken.id

        }catch(e){
            res.status(500).json({message: "Não foi possivel agendar seu Serviço"})
        }
    }
}

export default new AgendarServicoController()