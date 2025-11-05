import Disponibilidade from '../../model/disponibilidadeModel.js'
import Usuarios from '../../model/usuarioModel.js'

class CadastrarBarbeiroController{
    async store(req, res){
        try{
            const {nome_usuario, email_usuario, senha_usuario} = req.body

            if (!nome_usuario?.trim() || !email_usuario?.trim() || !senha_usuario?.trim()){
                return res.status(400).json({message: "Envie seu nome, email e senha"})
            }

            const verificaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!verificaEmail.test(email_usuario)){
                return res.status(400).json({ message: "Email inválido" })
            }

            const role = 'BARBEIRO'
            const barbeiro = await Usuarios.create({nome_usuario, email_usuario, senha_usuario, role})

            const dias = ['Ter', 'Qua', 'Qui', 'Sex', 'Sab']

            await Disponibilidade.bulkCreate(dias.map(dia => ({user_id: barbeiro.id, dia_semana: dia,})))
            res.status(201).json({message: "Usuário criado!"})
        }catch(e){
            res.status(400).json({message: "Não foi possivel cadastrar este usuário"})
        }
    }
}

export default new CadastrarBarbeiroController()