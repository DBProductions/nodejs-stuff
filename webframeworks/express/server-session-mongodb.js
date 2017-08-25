const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

const dbUrl = 'mongodb://127.0.0.1:27017/yourdb';
let sessionStore = new MongoStore({url: dbUrl});

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
