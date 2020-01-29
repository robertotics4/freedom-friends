const express = require('express');
const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PositionController = require('./app/controllers/PositionController');
const PlayerController = require('./app/controllers/PlayerController');
const TeamController = require('./app/controllers/TeamController');

routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:user_id', UserController.destroy);

routes.post('/authenticate', SessionController.authenticate);
//routes.use(authMiddleware);

routes.post('/players', PlayerController.store);
routes.get('/players', PlayerController.index);
routes.get('/players/:player_id', PlayerController.show);
routes.put('/players/:player_id', PlayerController.update);
routes.delete('/players/:player_id', PlayerController.destroy);

routes.get('/players/:player_id/positions', PositionController.index);
routes.post('/players/:player_id/positions', PositionController.store);

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.store);
routes.delete('/teams/:team_id', TeamController.destroy);

module.exports = routes;