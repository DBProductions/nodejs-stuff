var net = require('net');

var client = new net.Socket();
/** connection */
client.connect(3000, '127.0.0.1', function() {
	console.log('Connection open');
    client.write('nodejs networking');
});
/** get data */
client.on('data', function(data) {    
    console.log('DATA: ' + data);
    client.destroy();
});
/** connection close */
client.on('close', function() {
    console.log('Connection closed');
});