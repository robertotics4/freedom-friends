const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = 3333;

require('./database');

app.use(express.json());
app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});