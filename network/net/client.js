const net = require('net');
const client = new net.Socket();

const HOST = '127.0.0.1';
const PORT = 3000;

// connection
client.connect(PORT, HOST, () => {
	console.log('Connection open');
    client.write('nodejs networking 好的');
});

// get data
client.on('data', (data) => {
    console.log('DATA: ' + data);
    client.destroy();
});

// connection close
client.on('close', () => {
    console.log('Connection closed');
});
