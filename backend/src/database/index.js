const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

// Importando Models
const User = require('../app/models/User');
const Position = require('../app/models/Position');
const Player = require('../app/models/Player');
const Team = require('../app/models/Team');
const Goal = require('../app/models/Goal');
const Referee = require('../app/models/Referee');
const Match = require('../app/models/Match');
Scoreboard = require('../app/models/Scoreboard');

// Configurando a conexão com o banco
const connection = new Sequelize(dbconfig);

// Iniciando os Models
User.init(connection);
Position.init(connection);
Player.init(connection);
Team.init(connection);
Goal.init(connection);
Referee.init(connection);
Match.init(connection);
Scoreboard.init(connection);

// Iniciando associações
Player.associate(connection.models);
Team.associate(connection.models);
Position.associate(connection.models);
Goal.associate(connection.models);
Match.associate(connection.models);

module.exports = connection;