'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('agendamento', { 
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      barbeiro_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      data:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora:{
        type: Sequelize.TIME,
        allowNull: false
      },
      tipo_servico: {
        type: Sequelize.ENUM('corte', 'barba', 'barba+corte'),
        allowNull: false
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('marcado', 'finalizado', 'cancelado'),
        defaultValue: 'marcado',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
    });

    // Garanta que nem o barbeiro e usuario marque no mesmo horario/dia
    await queryInterface.addConstraint('agendamento', {
      fields: ['barbeiro_id', 'data', 'hora'],
      type: 'unique',
      name: 'unique_barbeiro_data_hora'
    })

    await queryInterface.addConstraint('agendamento', {
      fields: ['user_id', 'data', 'hora'],
      type: 'unique',
      name: 'unique_user_data_hora'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('agendamento');
  }
};
