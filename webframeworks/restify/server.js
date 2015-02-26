var restify = require('restify');

var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.queryParser());

// common handler
server.use(function (req, res, next){
    console.log('Request:', Date.now(), req.method, req.url);
    res.writeHead('Content-Type', 'application/json');
    next();
});

// main route
server.get('/', function(req, res, next) {
    res.end('{"response": "api documentation", "resources": "/api"}');
});

function responseFunc(req, res, next) {
    res.end('{"response":"get", "params":' + JSON.stringify(req.params) + '}');
    return next();
}
// define routes
server.put('/api', responseFunc);
server.get('/api', responseFunc);
server.get('/api/:id', responseFunc);
server.del('/api', responseFunc);
server.post('/api', responseFunc);

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
