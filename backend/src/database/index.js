const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

// Importando Models
const User = require('../app/models/User');
const Position = require('../app/models/Position');
const Player = require('../app/models/Player');

// Configurando a conexão com o banco
const connection = new Sequelize(dbconfig);

// Iniciando os Models
User.init(connection);
Position.init(connection);
Player.init(connection);

module.exports = connection;