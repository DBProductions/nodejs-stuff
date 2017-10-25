const amqp = require('amqp');
const connObj = {
    host: 'localhost',
    login: 'rabbit',
    password: 'rabbit',
    vhost: 'my_vhost'
};
let connection = amqp.createConnection(connObj);

connection.on('ready', () => {
    connection.queue('messages', {durable: true, autoDelete: false}, (queue) => {
        queue.bind('#');
        console.log(' [*] Waiting for messages. To exit press CTRL+C')
        queue.subscribe((msg) => {
            console.log(" [x] Received %s", msg.data.toString('utf-8'));
        });
    });
});
