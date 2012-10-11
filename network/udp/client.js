var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var message = new Buffer('this is a message');
client.send(message, 0, message.length, 3000, 'localhost');
client.close();
