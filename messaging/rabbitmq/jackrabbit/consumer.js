const jackrabbit = require('jackrabbit');
const rabbit = jackrabbit('amqp://rabbit:rabbit@localhost/my_vhost');

const receiveMessage = (data) => {
    console.log('Received:', data);
}

rabbit.default()
      .queue({name: 'messages'})
      .consume(receiveMessage, {noAck: true});
