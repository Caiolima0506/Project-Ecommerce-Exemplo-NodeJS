
const Sequelize = require('sequelize');
const database = require('../../../config/db');
 
const Cliente = database.define('Clientes', {
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
 
module.exports = Cliente;