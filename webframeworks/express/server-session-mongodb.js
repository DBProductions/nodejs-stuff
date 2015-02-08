var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

var dbUrl = 'mongodb://127.0.0.1:27017/yourdb';
var sessionStore = new MongoStore({url: dbUrl});

app.use(cookieParser());
app.use(session({
    store: sessionStore,
    maxAge: new Date(Date.now() + 3600000),
    resave: false, 
    saveUninitialized: false,
    secret: 'your secret'
}));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    if (req.session.counter) {
        ++req.session.counter;
    } else {
        req.session.counter = 1;
    }
    res.send('Counter ' + req.session.counter);
});

app.listen(3000);