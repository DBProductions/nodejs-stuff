var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', 'templates');

app.get('/', function(req, res){
    res.render('index.jade', { title: 'Express - Jade' });
});

app.listen(3000);