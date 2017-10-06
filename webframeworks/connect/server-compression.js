const connect = require('connect');
const compression = require('compression');
const app = connect();
const PORT = 3000;

// gzip/deflate outgoing responses
app.use(compression());

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Response from connect with compression');
});

app.listen(PORT);
