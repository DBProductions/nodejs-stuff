'use strict';
const restify = require('restify');
const server = restify.createServer({
    name: 'api',
    version: '0.0.1'
});
const PORT = 3000;

/**
 * when `mapParams: true` values from req.body are moved to req.params
 */
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser({mapParams: true}));

// deduplicates extra slashes in URLs
server.pre(restify.plugins.pre.dedupeSlashes());

// prepare request before routing
server.pre((req, res, next) => {
    req.headers.accept = 'application/json';
    return next();
});

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

server.on('after', (req, res, route, error) => {
    console.log('finished request', route);
});

server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
