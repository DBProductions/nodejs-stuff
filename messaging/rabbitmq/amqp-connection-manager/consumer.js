const amqp = require('amqp-connection-manager');

const config = {
  url: 'amqp://rabbit:rabbit@localhost/my_vhost',
  queueName: 'test-queue',
  exchangeName: 'test',
  exchangeType: 'topic',
  routingKey: '#',
  prefetch: 1
};

// handler function for incoming messages
const handleMessage = (channel, data) => {
  console.log(`Routing Key: ${data.fields.routingKey}\n`, data.content.toString());  
  channel.ack(data);
};

const channelConfig = {
  json: true,
  name: 'consumer-channel',
  setup: (channel) => {
    Promise.all([
      channel.assertExchange(config.exchangeName, config.exchangeType, {durable: true}),
      channel.assertQueue(config.queueName, { durable: true }),
      channel.bindQueue(config.queueName, config.exchangeName, config.routingKey),
      channel.prefetch(config.prefetch),
      channel.consume(config.queueName, async (message) => { handleMessage(channel, message); })
    ])
  }
}

const connection = amqp.connect([config.url]);
connection.on('connect', (data) => {
  console.log(`Connected to ${data.url}`);
}).on('disconnect', (data) => {
  console.log(`Disconnected: ${data.err}`);
});

const channelWrapper = connection.createChannel(channelConfig);
channelWrapper.on('connect', () => {
  console.log(`Channel "${channelWrapper.name}" is now connected`);
}).on('close', () => {
  console.log(`Channel "${channelWrapper.name}" is now closed`);
});

setInterval(() => {
  console.log(`Still connected: ${connection.isConnected()} ${new Date().toISOString()}`);
}, 5000);