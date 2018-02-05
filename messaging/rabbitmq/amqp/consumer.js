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
  connection.queue('test-queue', { durable: true, autoDelete: false }, (queue) => {
    queue.bind('test', 'user.events');
    console.log(' [*] Waiting for messages. To exit press CTRL+C')
    queue.subscribe((msg) => {
      console.log(msg.data.toString('utf-8'));
    });
  });
});
