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
    //bayeux.getClient().publish('/channel', {text: req.param('message')});
    res.sendfile(__dirname + '/index.html');
});
