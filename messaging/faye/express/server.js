const app = require('express')();
const server = require('http').createServer(app);
const faye = require('faye');

let bayeux = new faye.NodeAdapter({
	mount:   '/faye',
	timeout: 45
});

bayeux.attach(server);
server.listen(3000);

app.get('/', (req, res) => {
    setInterval(() => {
    	bayeux.getClient().publish('/channel', {text: 'server message'});
    }, 3000);
    res.sendFile(__dirname + '/index.html');
});
