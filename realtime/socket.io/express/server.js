const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var n = 0;
    var inter = setInterval(function() {
        n += 1;
        io.emit('msg', {message: n});
        if(n === 5) {
            clearInterval(inter);
        }
    }, 1000);

    socket.on('event', (data) => {
        io.emit('msg', {message: data.message});
    });
});
