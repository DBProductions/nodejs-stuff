var restify = require('restify');

var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.queryParser());

server.use(function (req, res, next){
    console.log('Request:', Date.now(), req.method, req.url);
    next();
});

server.use(function (req, res, next){
    res.writeHead('Content-Type', 'application/json');
    next();
});

function responseFunc(req, res, next) {
    res.end('{"response":"get", "params":' + JSON.stringify(req.params) + '}');
}

server.put('/api', responseFunc);
server.get('/api', responseFunc);
server.del('/api', responseFunc);
server.post('/api', responseFunc);

server.get('/', function(req, res, next) {
    res.end('{"response": "api documentation", "resources": "/resource"}');
});

server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});