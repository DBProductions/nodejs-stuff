var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(3000);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
    function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error while loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    socket.on('set name', function (name) {
        socket.set('nickname', name, function() {
            socket.broadcast.emit('msg', {name: name});
            socket.emit('msg', { welcome: 'Welcome ' + name });
        });
    });
    socket.on('event', function (data) {
        socket.get('nickname', function(err, name) {
            socket.broadcast.emit('msg', {message: name + ': ' + data.msg});
            socket.emit('msg', { message: name + ': ' + data.msg});
        });                
    });
});