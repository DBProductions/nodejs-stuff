var context = require('rabbit.js').createContext('amqp://rabbit:rabbit@localhost/my_vhost');

context.on('ready', () => {
    var pub = context.socket('PUB');
    pub.connect('events', () => {
        pub.write(JSON.stringify({message: 'rabbit.js works'}), 'utf8');
        console.log('write');
        process.exit();
    });
});
