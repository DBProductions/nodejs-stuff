const amqp = require('amqplib/callback_api');
const getConnectedChannel = require('./helper');

const config = {
  url: 'amqp://rabbit:rabbit@localhost/my_vhost',
  queueName: 'test-queue',
  exchangeName: 'test',
  routingKey: 'x.x.x',
  message: 'amqplib works'
};

getConnectedChannel(config.url).then((ch) => {
  let err = ch[0];
  let channel = ch[1];
  if (err) {
    throw err;
  }
  channel.assertExchange(config.exchangeName, 'topic', {durable: true}, (err, ok) => {
    if (false === channel.publish(config.exchangeName, config.routingKey, new Buffer(config.message))) {
      console.log('[AMQP] can not publish event');
    } else {
      console.log('[AMQP] published event');
    }
  });
}).catch((err) => {
  console.log(err);
});
