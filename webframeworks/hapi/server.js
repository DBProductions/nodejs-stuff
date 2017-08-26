const Hapi = require('hapi');

// create server with host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// set routes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
    	request.log(["pathData"]);
        reply('hapi response');
    }
});

server.start();
