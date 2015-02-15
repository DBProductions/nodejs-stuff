var connect = require('connect');
 
var app = connect();

app.use(function first_middleware(req, res, next) {
    console.log('Request-Time:', Date.now());
    next();
});
 
app.use('/', function main(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect response');
});
 
app.listen(3000);