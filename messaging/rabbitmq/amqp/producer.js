const amqp = require('amqp');

const connParams = {
    url: 'amqp://rabbit:rabbit@localhost/my_vhost'
};
const connOpts = {
    reconnect: false,
    reconnectBackoffStrategy: 'linear', // or 'exponential'
    reconnectBackoffTime: 500, // ms
};

let connection = amqp.createConnection(connParams, connOpts);

connection.on('ready', function() {
    // declare a default exchange connection.exchange('');
	let exchange = connection.exchange('test', { durable: true });
	setInterval(() => {
        exchange.publish('user.events', '{"name": "Test"}', {}, () => {
            console.log('publish');
        });
	}, 1000);
});
