const amqp = require('amqp');

const connParams = {
    url: 'amqp://rabbit:rabbit@localhost/my_vhost'
};
const connOpts = {
    reconnect: true,
    reconnectBackoffStrategy: 'linear', // or 'exponential'
    reconnectBackoffTime: 500, // ms
};

let connection = amqp.createConnection(connParams, connOpts);

connection.on('ready', function() {
	// create a queue
    connection.queue('queue', { durable: true }, (queue) => {
        queue.bind('test', 'user.events');
        console.log(' [*] Waiting for messages. To exit press CTRL+C')
        queue.subscribe((msg) => {
            console.log(msg.data.toString('utf-8'));
        });
    });
});
