const Hapi = require('hapi');

// create server with host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register(require('vision'), (err) => {
    // set views
    server.views({
        engines: {
        	jade: require('pug')
        },
        path: __dirname + '/templates',
        compileOptions: {
            pretty: true
        }
    });
});

// define routes
const routes = [
    {method: 'GET', path: '/', handler: function (request, reply) { request.log(["pathData"]); reply('hapi response'); }},
    {method: ['PUT', 'POST'], path: '/b', handler: function (request, reply) { return reply('hapi response'); }}
];

// set routes
server.route(routes);

server.route({
    method: 'GET',
    path: '/template',
    handler: (request, reply) => {
        reply.view('index', {
            title: 'Hapi - Pug'
        });
    }
});

server.start();
