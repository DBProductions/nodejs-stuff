var context = require('rabbit.js').createContext();

context.on('ready', function() {
    var pub = context.socket('PUB');
    pub.connect('events', function() {
        pub.write(JSON.stringify({message: 'rabbit.js works'}), 'utf8');
        process.exit();
    });
});