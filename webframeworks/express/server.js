const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'templates');
app.set('views', path.join(__dirname + '/', 'templates'));

app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'your secret'
}));

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('express response');
});

app.get('/template', (req, res) => {
    res.render('index.pug', { title: 'Express - Pug' });
});

app.get('/session', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    if (req.session.counter) {
        ++req.session.counter;
    } else {
        req.session.counter = 1;
    }
    res.send('Counter ' + req.session.counter);
});

let routes = express.Router();

routes.get('/', (req, res) => {
    res.json({success: true, ts: Date.now()});
});

app.use('/api', routes);

app.listen(3000);
