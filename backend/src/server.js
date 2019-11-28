const app = require('./app');
const environment = require('../.env');

app.listen(environment.PORT, () => {
    console.log(`Server started on port ${environment.PORT}`);
});