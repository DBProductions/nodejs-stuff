const http = require('http');
const fs = require('fs');
const faye = require('faye');

let bayeux = new faye.NodeAdapter({
	mount:   '/faye',
	timeout: 45
});

let server = http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html',
    (err, data) => {
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
