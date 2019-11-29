const express = require('express');
const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.destroy);

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => {});

module.exports = routes;