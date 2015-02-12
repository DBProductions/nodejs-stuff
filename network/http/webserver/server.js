var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring');       

var port = 3000;
    
http.createServer(function (request, response) {
    var filePath = './public' + request.url;
    // routing
    if (filePath == './public/') {
        filePath = './public/index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    fs.exists(filePath, function(exists) {   
        if (exists === true) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            console.log('error');
            response.writeHead(404);
            response.end();
        }
    });
}).listen(port);
console.log('webserver listen on port: ' + port);