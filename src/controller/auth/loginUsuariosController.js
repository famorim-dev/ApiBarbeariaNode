import Usuarios from "../../model/usuarioModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

class LoginUsuariosController{
    async store(req, res){
        const {email_usuario, senha_usuario} = req.body

        if (!email_usuario?.trim() || !senha_usuario?.trim()){
            return res.status(400).json({message: "Email e senha inválidos"})
        }

        const verificaEmail = await Usuarios.findOne({where: {email_usuario}})
        if(!verificaEmail){
            return res.status(400).json({message: "Email e senha inválidos"})
        }

        const verificaSenha = await bcrypt.compare(senha_usuario, verificaEmail.senha_usuario)
        if(!verificaSenha){
            return res.status(400).json({message: "Email e senha inválidos"})
        }

        const {id, role} = verificaEmail
        const token = jwt.sign({id, email_usuario, role}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRED})
        res.status(201).json({token})
    }
}

export default new LoginUsuariosController()