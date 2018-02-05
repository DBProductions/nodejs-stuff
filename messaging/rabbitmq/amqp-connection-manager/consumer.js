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
    Promise.all([
      channel.assertExchange(config.exchangeName, 'topic', {durable: true}),
      channel.assertQueue(config.queueName, { durable: true }),
      channel.bindQueue(config.queueName, config.exchangeName, config.routingKey),
      channel.consume(config.queueName, handleMessage)
    ])
  }
});

const handleMessage = (data) => {
  console.log(data.fields.routingKey, data.content.toString());
  channelWrapper.ack(data);
};
