'use strict';

const quantidade = require('../api/data/schema/quantidades');
const produto = require('../api/data/schema/produto');
const pedido = require('../api/data/schema/pedido');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quantidades', {

      QuantidadeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      Quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      ProdutoId:{ 
          type: Sequelize.INTEGER,
          allowNull: false
        
      },
      PedidoId:{
          type: Sequelize.INTEGER,
          allowNull: false
      }

      

    })

    produto.hasOne(quantidade);
    quantidade.belongsTo(produto);

    pedido.hasOne(quantidade);
    quantidade.belongsTo(pedido);

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Quantidades');
  }
};
