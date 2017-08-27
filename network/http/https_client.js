const https = require('https');

let request = https.request({'hostname':'encrypted.google.com'}, (res) => {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
        console.log(chunk);
    });
});
request.end();
