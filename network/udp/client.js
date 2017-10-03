const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const HOST = '127.0.0.1';
const PORT = 3000;

let message = new Buffer('this is the message');

client.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
    if (err) throw err;
    console.log(`UDP message sent to ${HOST}:${PORT}`);
    client.close();
});
