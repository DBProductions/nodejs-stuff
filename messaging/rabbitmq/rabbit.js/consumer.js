var context = require('rabbit.js').createContext('amqp://rabbit:rabbit@localhost/my_vhost');

context.on('ready', () => {
    var sub = context.socket('SUB');
    sub.setEncoding('utf8');
    //sub.pipe(process.stdout);
    sub.connect('events', () => {
        console.log('connected');
        sub.on('data', (message) => {
        	console.log(message);
        });
    });
});
