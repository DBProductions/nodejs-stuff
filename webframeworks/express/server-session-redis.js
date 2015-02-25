var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();

var redisHost = '127.0.0.1', redisPort = 6379;
var sessionStore = new RedisStore({host: redisHost, port: redisPort});

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