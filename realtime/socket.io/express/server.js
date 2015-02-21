var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var n = 0;
    var inter = setInterval(function() {
        n += 1;
        io.emit('msg', {message: n});
        if(n === 5) {
            clearInterval(inter);
        }
    }, 1000);
    
    socket.on('event', function (data) {
        io.emit('msg', {message: data.message});
    });
});