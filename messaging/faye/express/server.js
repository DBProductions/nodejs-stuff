var app = require('express')(),
    server = require('http').createServer(app),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({
	mount:   '/faye',
	timeout: 45
});

bayeux.attach(server);
server.listen(3000);

app.get('/', function (req, res) {
    setInterval(function() {
    	bayeux.getClient().publish('/channel', {text: 'server message'});
    }, 3000);
    res.sendFile(__dirname + '/index.html');
});
