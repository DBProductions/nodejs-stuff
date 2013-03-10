var http = require('http');

var request = http.request({'hostname':'www.google.de'}, function (res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
        console.log(chunk);
    });
});
request.end();
