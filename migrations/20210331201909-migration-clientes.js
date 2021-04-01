'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {

      ClienteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      Nome: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      CPF: {
          type: Sequelize.STRING(11),
          allowNull: false
      },
      Sexo: {
          type: Sequelize.STRING(10),
          allowNull: false
      },
      Email: {
          type: Sequelize.STRING(40),
          allowNull: false
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};
