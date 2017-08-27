const express = require('express');
const sockjs = require('sockjs');
const http = require('http');

const sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
const sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', (conn) => {
    var n = 0;
    var inter = setInterval(() => {
        n += 1;
        conn.write('{"message": ' + n + '}');
        if(n === 5) {
        	clearInterval(inter);
        }
    }, 1000);

    conn.on('data', (message) => {
        conn.write(message);
    });
});

let app = express();
let server = http.createServer(app);

sockjs_echo.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:3000' );
server.listen(3000, '0.0.0.0');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
