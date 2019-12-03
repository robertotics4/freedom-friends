const express = require('express');
const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.destroy);

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => { ok: true });

module.exports = routes;