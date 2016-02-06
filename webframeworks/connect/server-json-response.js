var connect = require('connect');

var app = connect();

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', function(req, res) {
    res.end('{"success": true, "ts":' + (+new Date()) + '}');
});

app.listen(3000);
