
const Sequelize = require('sequelize');
const config = require('../config/dbConfig');
const sequelize = new Sequelize(config);
 
module.exports = sequelize;