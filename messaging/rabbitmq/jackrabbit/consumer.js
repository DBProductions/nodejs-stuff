const jackrabbit = require('jackrabbit');
const rabbit = jackrabbit('amqp://rabbit:rabbit@localhost/my_vhost');
const exchange = rabbit.default();
const queue = exchange.queue({name: 'messages'});

const receiveMessage = (data) => {
    console.log('Received:', data);
}

queue.consume(receiveMessage, {noAck: true});
