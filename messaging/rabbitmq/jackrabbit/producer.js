const jackrabbit = require('jackrabbit');
const rabbit = jackrabbit('amqp://rabbit:rabbit@localhost/my_vhost');
const exchange = rabbit.default();

exchange.publish('Jackrabbit', {key: 'messages'})
exchange.on('drain', rabbit.close);
