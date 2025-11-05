import { Sequelize, Model } from "sequelize";
import bcrypt from "bcryptjs";

class Usuarios extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            nome_usuario:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: 'Nome do aluno é obrigatorio'
                    },
                    len:{
                        args: [3,100],
                        msg:'Nome do aluno deve ter mais de 3 caracteres'
                    }
                }
            },
            email_usuario:{
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: 'E-mail ja está em uso'
                },
                 validate: {
                    isEmail: {
                        msg: 'E-mail inválido'
                    }
                }
            },
            senha_usuario:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: 'Senha é obrigatorio'
                    },
                    len:{
                        args: [6,50],
                        msg:'Senha deve ter mais de 6 caracteres'
                    }
                }
            },
            role:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn:{
                        args: [['USER', 'ADMIN', 'BARBEIRO']],
                        msg: 'role inválido'
                    },
                }
            },
        },{
            sequelize,
            tableName: 'usuarios',
            createdAt: 'created_at_usuario',  // nome customizado
            updatedAt: 'updated_at_usuario',  // nome customizado
            timestamps: true, // garante que o Sequelize atualize os campos
        })
        this.addHook('beforeSave', async usuario => {
            if(usuario.senha_usuario){
                usuario.senha_usuario = await bcrypt.hash(usuario.senha_usuario, 8)
            }
        })
    }
}

export default Usuarios