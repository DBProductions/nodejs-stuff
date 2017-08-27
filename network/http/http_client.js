const http = require('http');

let request = http.request({'hostname':'www.google.de'}, (res) => {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
        console.log(chunk);
    });
});
request.end();
