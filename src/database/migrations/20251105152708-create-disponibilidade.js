'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('disponibilidade', { 
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      dia_semana:{
        type: Sequelize.ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'),
        allowNull: false
      },
      hora_inicio:{
        type: Sequelize.TIME,
        defaultValue: '09:00',
        allowNull: false
      },
      hora_fim:{
        type: Sequelize.TIME,
        defaultValue: '19:00',
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('disponivel', 'indisponivel', 'folga'),
        defaultValue: 'disponivel',
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

    await queryInterface.addConstraint('disponibilidade', {
      fields: ['user_id', 'dia_semana'],
      type: 'unique',
      name: 'unique_user_dia'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('disponibilidade');
  }
};
