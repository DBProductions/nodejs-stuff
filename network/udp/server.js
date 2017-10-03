const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = '127.0.0.1';
const PORT = 3000;

server.on('message', (message, rinfo) => {
	console.log(`server got message: ${message} from ${rinfo.address}:${rinfo.port}`)
});

server.on('listening', () => {
	let address = server.address();
	console.log(`server listening on ${address.address}:${address.port}`);
});

server.bind(PORT, HOST);
