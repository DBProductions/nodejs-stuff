const Hapi = require('hapi');

// create server with host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// define routes
const routes = [
    {method: 'GET', path: '/', handler: function (request, reply) { return reply('hapi response'); }},
    {method: 'GET', path: '/a', handler: function (request, reply) { return reply('hapi response'); }},
    {method: ['PUT', 'POST'], path: '/b', handler: function (request, reply) { return reply('hapi response'); }}
];

// set routes
server.route(routes);

server.start();
