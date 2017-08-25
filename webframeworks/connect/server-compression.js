const connect = require('connect');
const compression = require('compression');

const app = connect();

// gzip/deflate outgoing responses
app.use(compression());

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect compression response');
});

app.listen(3000);
