import jwt from "jsonwebtoken"

export default(req, res, next) =>{
    const{auth} = req.headers.authorization

    if(!auth){
        return res.status(401).json({message: "token inválido" })
    }

    const [, token] = auth.split(' ')

    try{
        const tokenVerificado = jwt.verify(token, process.env.TOKEN_SECRET)
        const {id, email_usuario, role } = tokenVerificado
        req.id = id
        req.email_usuario = email_usuario
        req.role = role
        return next()
    }catch(e){
        return res.status(401).json({message: 'token inválido'})
    }
}