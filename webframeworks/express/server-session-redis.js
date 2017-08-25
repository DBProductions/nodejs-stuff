const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const app = express();

const redisHost = '127.0.0.1', redisPort = 6379;
let sessionStore = new RedisStore({host: redisHost, port: redisPort});

app.use(cookieParser());
app.use(session({
    store: sessionStore,
    maxAge: new Date(Date.now() + 3600000),
    resave: false,
    saveUninitialized: false,
    secret: 'your secret'
}));

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    if (req.session.counter) {
        ++req.session.counter;
    } else {
        req.session.counter = 1;
    }
    res.send('Counter ' + req.session.counter);
});

app.listen(3000);
