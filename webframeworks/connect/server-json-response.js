const connect = require('connect');

const app = connect();

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', (req, res) => {
    res.end('{"success": true, "ts":' + (+new Date()) + '}');
});

app.listen(3000);
