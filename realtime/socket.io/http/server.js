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
