const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const port = 3000;

http.createServer((request, response) => {
    let filePath = __dirname + '/public' + request.url;
    if (filePath == __dirname + '/public/') {
        filePath = __dirname + '/public/index.html';
    }

    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.exists(filePath, (exists) => {
        if (exists === true) {
            fs.readFile(filePath, (error, content) => {
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
console.log('webserver listening on ' + port);
