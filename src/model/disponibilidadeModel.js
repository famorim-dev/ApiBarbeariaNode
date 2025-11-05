import { Sequelize, Model } from "sequelize";

class Disponibilidade extends Model{
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
            dia_semana: {
                type: Sequelize.ENUM('Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            hora_inicio: {
                type: Sequelize.STRING,
                defaultValue: '09:00',
                allowNull: false,
                validate: {
                    is: /^([01]\d|2[0-3]):([0-5]\d)$/,
                }
            },
            hora_fim: {
                type: Sequelize.STRING,
                defaultValue: '19:00',
                allowNull: false,
                validate: {
                    is: /^([01]\d|2[0-3]):([0-5]\d)$/,
                }
            },
            status: {
                type: Sequelize.ENUM('disponivel', 'indisponivel', 'folga'),
                defaultValue: 'disponivel',
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },
        },{
            sequelize,
            tableName: 'disponibilidade',
            timestamps: true, // garante que o Sequelize atualize os campos
        })
    }
}

export default Disponibilidade