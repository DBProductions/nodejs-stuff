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

// set routes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply.view('index', {
            title: 'Hapi - Pug'
        });
    }
});

server.start();
