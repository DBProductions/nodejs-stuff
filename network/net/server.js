var net = require('net');
    
var buffer = [];

var server = net.createServer(function(socket) {
	/** get data */
	socket.on('data', function(data) {
		console.log('connection');
		buffer.push(data);
		socket.write('{"name":"json"}\n');
		socket.end();
	});
	/** connection close */
	socket.on('end', function(data) {
		console.log('close');
		try {
			var data = buffer.join("");
			console.log(data);
			socket.end('ok');
		} catch(e) {
			console.log('Error: ' + e.message);
			return;
		}
	});
	/** error handling */
	socket.on('error', function(error) {
		console.log('error', error);
	});
});
server.listen(3000);
console.log('start - ' + server.address().address + ':' + server.address().port);
