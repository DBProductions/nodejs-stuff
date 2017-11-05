const amqp = require('amqplib/callback_api');
const getConnectedChannel = require('./helper');

const config = {
    url: 'amqp://rabbit:rabbit@localhost/my_vhost',
    queueName: 'test-queue',
    exchangeName: 'test',
    routingKey: '#'
};

getConnectedChannel(config.url).then((ch) => {
    let err = ch[0];
    let channel = ch[1];
    if (err) {
        throw err;
    }
    channel.prefetch(10);
    channel.assertQueue(config.queueName, { durable: true }, (err, _ok) => {
        channel.bindQueue(config.queueName,
                     config.exchangeName,
                     config.routingKey,
                     {},
                     () => {
            channel.consume('test-queue', (msg) => {
                console.log(msg);
                channel.ack(msg);
                //ch.reject(msg, true);
            }, { noAck: false });
        });
    });
}).catch((err) => {
    console.log(err);
});
