const jackrabbit = require('jackrabbit');
const rabbit = jackrabbit('amqp://rabbit:rabbit@localhost/my_vhost');

rabbit.default()
      .publish('Jackrabbit', {key: 'messages'})
      .on('drain', rabbit.close);
