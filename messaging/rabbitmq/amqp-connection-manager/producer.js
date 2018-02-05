const amqp = require('amqp-connection-manager');

const config = {
  url: 'amqp://rabbit:rabbit@localhost/my_vhost',
  queueName: 'test-queue',
  exchangeName: 'test',
  routingKey: '#'
};

const connection = amqp.connect([config.url]);

let channelWrapper = connection.createChannel({
  json: true,
  setup: (channel) => {
    return channel.assertQueue(config.queueName, {durable: true});
  }
});

channelWrapper.sendToQueue(config.queueName, {amqp: 'works'}).then(() => {
  return console.log('Message sent');
}).catch(err => {
  return console.log('Message rejected');
});
