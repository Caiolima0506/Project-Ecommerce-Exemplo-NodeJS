
const Sequelize = require('sequelize');
const database = require('../../../config/db');
 
const Produto = database.define('Produtos', {
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
 
module.exports = Produto;