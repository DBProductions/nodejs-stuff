var http = require('http'),
    fs = require('fs'),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({
	mount:   '/faye',
	timeout: 45
});

var server = http.createServer(function(req, res) {
    fs.readFile(__dirname + '/index.html',
    function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error while loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
});

bayeux.attach(server);
server.listen(3000);