var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.get('/', function(req, res) {
    res.render('index.ejs', {title: 'Ejs'});
});

app.listen(3000);