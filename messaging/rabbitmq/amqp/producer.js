const amqp = require('amqp');
const connObj = {
    host: 'localhost',
    login: 'rabbit',
    password: 'rabbit',
    vhost: 'my_vhost'
};
let connection = amqp.createConnection(connObj);

connection.on('ready', () => {
    connection.publish('messages', '{name:"Test"}');
    connection.end();
});
