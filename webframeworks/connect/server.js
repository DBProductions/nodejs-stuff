const connect = require('connect');
const app = connect();
const PORT = 3000;

app.use((req, res, next) => {
    console.log('Request-Time:', Date.now());
    next();
});

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Response from connect');
});

app.listen(PORT);
