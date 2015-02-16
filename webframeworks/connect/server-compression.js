var connect = require('connect');
var compression = require('compression');

var app = connect();

// gzip/deflate outgoing responses
app.use(compression());
 
app.use('/', function main(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect compression response');
});
 
app.listen(3000);