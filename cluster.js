var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var numReqs = 0;

if (cluster.isMaster) {
	for(var i = 0; i < numCPUs; i++) {
		var worker = cluster.fork();
		worker.on('message', function(msg) {
            if (msg.cmd && msg.cmd == 'notifyRequest') {
            	numReqs++;
            	console.log('request: ' + numReqs);
            }
		});
	}
	cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
	});
} else {
	http.Server(function(req, res) {
		res.writeHead(200);
		res.end("NodeJS cluster");
		// send message to master process
		process.send({cmd: 'notifyRequest'});
		console.log('request comes in');
	}).listen(3000);
}