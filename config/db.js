
const Sequelize = require('sequelize');
const config = require('../config/dbConfig');
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        define: config.define
    });
 
module.exports = sequelize;