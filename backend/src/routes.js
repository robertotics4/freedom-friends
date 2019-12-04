const express = require('express');
const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PositionController = require('./app/controllers/PositionController');

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.destroy);

routes.post('/sessions', SessionController.store);
//routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => { ok: true });

routes.post('/positions', PositionController.store);
routes.get('/positions', PositionController.index);
routes.get('/positions/:id', PositionController.show);
routes.put('/positions/:id', PositionController.update);
routes.delete('/positions/:id', PositionController.destroy);

module.exports = routes;