'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos', {

      ProdutoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      Nome: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      Cor: {
          type: Sequelize.STRING(20),
          allowNull: false
      },
      Tamanho: {
          type: Sequelize.STRING(10),
          allowNull: false
      },
      Valor: {
          type: Sequelize.DECIMAL,
          allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Produtos');
  }
};
