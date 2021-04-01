
const Sequelize = require('sequelize');
const database = require('../../../config/db');
 
const Quantidade = database.define('Quantidades', {
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
        allowNull: false,
        references: {    
          model: 'Produtos',
          key: 'ProdutoId'
        }
    },
    PedidoId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {    
          model: 'Pedidos',
          key: 'PedidoId'
        }
    }
})
 
module.exports = Quantidade;