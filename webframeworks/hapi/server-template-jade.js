var Hapi = require('hapi');

// create server with host and port
var server = new Hapi.Server('localhost', 3000);

// set views
server.views({
    engines: { 
    	jade: require('jade') 
    },
    path: __dirname + '/templates',
    compileOptions: {
        pretty: true
    }
});

// set routes
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {
            title: 'Hapi ' + Hapi.version + ' - Jade'
        });
    }
});

server.start();
