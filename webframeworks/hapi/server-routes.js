var Hapi = require('hapi');

// create server with host and port
var server = new Hapi.Server('localhost', 3000);

// define routes
var routes = [
    {method: 'GET', path: '/', handler: function (request, reply) { return reply('hapi response'); }},
    {method: 'GET', path: '/a', handler: function (request, reply) { return reply('hapi response'); }},
    {method: ['PUT', 'POST'], path: '/b', handler: function (request, reply) { return reply('hapi response'); }}
];

// set routes
server.route(routes);

// start server
server.start();
