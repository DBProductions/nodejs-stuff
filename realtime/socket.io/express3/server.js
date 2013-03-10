var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    var n = 0;
    var inter = setInterval(function() {
        n += 1;
        socket.emit('msg', {message: n});
        if(n === 5) {
            clearInterval(inter);
        }
    }, 1000);
    
    socket.on('event', function (data) {
        socket.emit('msg', {message: data.message});
    });
});