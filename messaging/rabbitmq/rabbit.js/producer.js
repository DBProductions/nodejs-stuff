const context = require('rabbit.js').createContext('amqp://rabbit:rabbit@localhost/my_vhost');

context.on('ready', () => {
  let pub = context.socket('PUB');
  pub.connect('events', function() {
    pub.write(JSON.stringify({message: 'rabbit.js works'}), 'utf8');
  });
});
