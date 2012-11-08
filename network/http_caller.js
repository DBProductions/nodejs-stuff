var http = require('http'),
    querystring = require('querystring');

function httpCall(options, cb, data) {
    var response = '';
    var req = http.request(options, function(res) {
        response += 'STATUS: ' + res.statusCode + "\n";
	response += 'HEADERS: ' + JSON.stringify(res.headers);
	res.setEncoding('utf8');
    	res.on('data', function (chunk) {
            response += 'BODY: ' + chunk;
    	});
    	res.on('end', function (chunk) {
    	    if (cb && (typeof cb === 'function')) cb(response);
    	});
    });
    if (data) req.write(data);
    req.end();
}

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/',
    method: 'GET'
};

httpCall(options, console.log);

var post_data = querystring.stringify({
    'name': 'username',
    'email': 'user@web.com',
});
var options = {
    host: 'httpbin.org',
    port: 80,
    path: '/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
    }
};

httpCall(options, console.log, post_data);
