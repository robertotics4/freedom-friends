const express = require('express');
const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PositionController = require('./app/controllers/PositionController');
const PlayerController = require('./app/controllers/PlayerController');

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.destroy);

routes.post('/authenticate', SessionController.authenticate);
routes.use(authMiddleware);

routes.post('/positions', PositionController.store);
routes.get('/positions', PositionController.index);
routes.get('/positions/:id', PositionController.show);
routes.put('/positions/:id', PositionController.update);
routes.delete('/positions/:id', PositionController.destroy);

routes.post('/players', PlayerController.store);
routes.get('/players', PlayerController.index);
routes.get('/players/:id', PlayerController.show);
routes.put('/players/:id', PlayerController.update);
routes.delete('/players/:id', PlayerController.destroy);

module.exports = routes;