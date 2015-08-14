var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

var routes = express.Router();

routes.get('/', function(req, res) {
    res.json({success: true, ts: +new Date()});
});

app.use('/api', routes);

app.listen(3000);
