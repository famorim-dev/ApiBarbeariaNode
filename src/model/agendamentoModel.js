import { Sequelize, Model } from "sequelize";
import Usuarios from '../model/usuarioModel.js'

class Agendamento extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            user_id:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: 'id do usuario é obrigatorio'
                    },
                }
            },
            barbeiro_id:{
                type: Sequelize.UUID,
                allowNull: false,
                validate: {
                    notEmpty:{
                        msg: 'id do barbeiro é obrigatorio'
                    },
                }
            },
            data: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            hora: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: /^([01]\d|2[0-3]):([0-5]\d)$/,
                }
            },
            tipo_servico: {
                type: Sequelize.ENUM('corte', 'barba', 'barba+corte'),
                allowNull: false
            },
            valor: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: true,
                },
            },
            status: {
                type: Sequelize.ENUM('marcado', 'finalizado', 'cancelado'),
                defaultValue: 'marcado',
                allowNull: false,
            },
        },{
            sequelize,
            tableName: 'agendamento',
            timestamps: true,
            underscored: true,
        })
        this.belongsTo(Usuarios, { foreignKey: "user_id", as: "usuario" })
        this.belongsTo(Usuarios, { foreignKey: "barbeiro_id", as: "barbeiro" })
    
        return this
    }
}

export default Agendamento