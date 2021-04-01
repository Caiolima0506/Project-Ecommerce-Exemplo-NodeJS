'use strict';

const cliente = require('../api/data/schema/cliente');
const pedido = require('../api/data/schema/pedido');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {

      PedidoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      Data: {
          type: Sequelize.DATE,
          allowNull: false
      },
      Observacao: {
          type: Sequelize.STRING(300),
          allowNull: false
      },
      FormaPagamento: {
          type: Sequelize.STRING(20),
          allowNull: false
      },
      ClienteId:{
        type: Sequelize.INTEGER,
        allowNull: false
      }

    })

    pedido.hasOne(cliente);
    cliente.belongsTo(pedido);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};
