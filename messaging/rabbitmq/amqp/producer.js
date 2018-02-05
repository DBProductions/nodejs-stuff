const amqp = require('amqp');

const connParams = {
  url: 'amqp://rabbit:rabbit@localhost/my_vhost'
};
const connOpts = {
  reconnect: true,
  reconnectBackoffStrategy: 'linear',
  reconnectBackoffTime: 500,
};

let connection = amqp.createConnection(connParams, connOpts);

connection.on('ready', () => {
  let exchange = connection.exchange('test', { durable: true, autoDelete: false });
  setInterval(() => {
    exchange.publish('user.events', '{"name": "Test"}', {});
  }, 1000);
});
