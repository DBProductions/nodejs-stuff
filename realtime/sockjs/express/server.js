var express = require('express');
var sockjs = require('sockjs');
var http = require('http');

var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    var n = 0;
    var inter = setInterval(function() {
        n += 1;
        conn.write('{"message": ' + n + '}');
        if(n === 5) {
        	clearInterval(inter);
        }
    }, 1000);
	
    conn.on('data', function(message) {
        conn.write(message);
    });
});

var app = express();
var server = http.createServer(app);

sockjs_echo.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:3000' );
server.listen(3000, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});