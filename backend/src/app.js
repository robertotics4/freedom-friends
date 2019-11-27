const express = require('express');
const routes = require('./routes');

class AppController {
    constructor() {
        this.express = express();

        require('./database');

        this.initMiddlewares();
        this.initRoutes();
    }

    initMiddlewares() {
        this.express.use(express.json());
    }

    initRoutes() {
        this.express.use('/api', routes);
    }
}

module.exports = new AppController().express;