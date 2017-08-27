const http = require('http');
const querystring = require('querystring');

let httpCall = (options, cb, data) => {
    let response = '';
    let req = http.request(options, (res) => {
        response += 'STATUS: ' + res.statusCode + "\n";
	    response += 'HEADERS: ' + JSON.stringify(res.headers);
	    res.setEncoding('utf8');
    	res.on('data', (chunk) => {
            response += 'BODY: ' + chunk;
    	});
    	res.on('end', (chunk) => {
    	    if (cb && (typeof cb === 'function')) cb(response);
    	});
    });
    if (data) req.write(data);
    req.end();
}

let get_options = {
    host: 'www.google.com',
    port: 80,
    path: '/',
    method: 'GET'
};

httpCall(get_options, console.log);

let post_data = querystring.stringify({
    'name': 'username',
    'email': 'user@web.com',
});
let post_options = {
    host: 'httpbin.org',
    port: 80,
    path: '/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
    }
};

httpCall(post_options, console.log, post_data);
