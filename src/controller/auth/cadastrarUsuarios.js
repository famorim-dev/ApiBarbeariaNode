import Usuario from "../../model/usuarioModel.js"

class CadastrarUsuarioController{
    async create(req, res){
        try{
            const {nome_usuario, email_usuario, senha_usuario} = req.body
            
            if (!nome_usuario?.trim() || !email_usuario?.trim() || !senha_usuario?.trim()){
                return res.status(400).json({message: "Envie seu nome, email e senha"})
            }

            const verificaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!verificaEmail.test(email_usuario)){
                return res.status(400).json({ message: "Email inválido" })
            }

            const role = 'USER'
            await Usuario.create({nome_usuario, email_usuario, senha_usuario, role})
            res.status(201).json({message: "Usuário criado!"})
        }catch(e){
            console.error(e)
            res.status(400).json({message: "Não foi possivel cadastrar este usuário"}, e)
        }
    }
}

export default new CadastrarUsuarioController()