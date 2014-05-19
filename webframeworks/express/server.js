var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('express response');
});

app.listen(3000);