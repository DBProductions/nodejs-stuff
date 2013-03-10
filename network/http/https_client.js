var https = require('https');

var request = https.request({'hostname':'encrypted.google.com'}, function (res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
        console.log(chunk);
    });
});
request.end();
