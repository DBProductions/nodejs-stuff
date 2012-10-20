var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});

var static_directory = new node_static.Server(__dirname);

var server = http.createServer();

server.addListener('request', function(req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function(req,res){
    res.end();
});

sockjs_echo.installHandlers(server, {prefix: '/echo'});

console.log(' [*] Listening on 0.0.0.0:3000' );
server.listen(3000, '0.0.0.0');