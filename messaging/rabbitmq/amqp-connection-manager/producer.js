const amqp = require('amqp-connection-manager');

const config = {
  url: 'amqp://rabbit:rabbit@localhost/my_vhost',
  queueName: 'test-queue',
  exchangeName: 'test',
  routingKey: '#'
};

const channelConfig = {
  json: true,
  name: 'producer-channel',
  setup: (channel) => {
    Promise.all([
      channel.assertQueue(config.queueName, {durable: true})
    ])
  }
};

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

channelWrapper.sendToQueue(config.queueName, {amqp: 'works'}).then(() => {
  console.log('Message sent');
  connection.close();  
  return;
}).catch(err => {
  return console.log('Message rejected');
});
