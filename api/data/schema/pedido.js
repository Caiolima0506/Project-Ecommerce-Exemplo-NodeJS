
const Sequelize = require('sequelize');
const database = require('../../../config/db');
 
const Pedido = database.define('Pedidos', {
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
    ClienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {    
          model: 'Clientes',
          key: 'ClienteId'
        }
    }
})

module.exports = Pedido;