var Hapi = require('hapi');

// create server with host and port
var server = new Hapi.Server('localhost', 3000);

// define routes
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
    	request.log(["pathData"]);
        reply('hapi response');
    }
});

// start server
server.start();