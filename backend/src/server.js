const app = require('./app');
const PORT = 3333;

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${PORT}`);
});