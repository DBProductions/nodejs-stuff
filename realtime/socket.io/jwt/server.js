const io = require('socket.io').listen(3000);
const socketioJwt = require("socketio-jwt");

io.sockets.on('connection', socketioJwt.authorize({
    secret: 'xyz123',
    timeout: 15000 // 15 seconds to send the authentication message
})).on('authenticated', (socket) => {
    console.log('hello! ' + socket.decoded_token.user);
    io.emit('msg', {message: 'Welcome ' + socket.decoded_token.user});
});
