const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

// Importando Models
const User = require('../models/User');

// Configurando a conexão com o banco
const connection = new Sequelize(dbconfig);

// Iniciando os Models
User.init(connection);

module.exports = connection;