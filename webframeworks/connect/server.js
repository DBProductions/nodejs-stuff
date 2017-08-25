const connect = require('connect');

const app = connect();

app.use((req, res, next) => {
    console.log('Request-Time:', Date.now());
    next();
});

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect response');
});

app.listen(3000);
