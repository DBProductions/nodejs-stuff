var context = require('rabbit.js').createContext('amqp://rabbit:rabbit@localhost/my_vhost');

context.on('ready', function() {
    var sub = context.socket('SUB');
    sub.setEncoding('utf8');
    sub.connect('events', function() {
        console.log('connected');
        sub.on('data', function(message) {
        	console.log(message);
        });
    });
});
