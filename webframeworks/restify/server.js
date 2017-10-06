'use strict';
const restify = require('restify');
const server = restify.createServer({
    name: 'api'
});
const PORT = 3000;

/**
 * when `mapParams: true` values from req.body are moved to req.params
 */
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser({mapParams: true}));

// common handler
server.use((req, res, next) => {
    console.log('Request:', Date.now(), req.method, req.url);
    next();
});

// response function
let responseFunc = (req, res, next) => {
    res.end('{"response":"get", "params":' + JSON.stringify(req.params) + '}');
    return next();
};

// main route
server.get('/', (req, res, next) => {
    res.end('{"response": "api documentation", "resources": "/api"}');
});
// define routes
server.put('/api', responseFunc);
server.get('/api', responseFunc);
server.get('/api/:id', responseFunc);
server.get('/api/:id/:group', responseFunc);
server.del('/api', responseFunc);
server.post('/api', responseFunc);

server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
