'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', { 
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      nome_usuario:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email_usuario:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      senha_usuario:{
        type: Sequelize.STRING(200),
        allowNull: false
      },
      role:{
        type: Sequelize.ENUM('USER', 'ADMIN'),
        defaultValue: 'USER',
        allowNull: false
      },
      created_at_usuario: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at_usuario: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
