const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', 'templates');

app.get('/', (req, res) => {
    res.render('index.jade', { title: 'Express - Jade' });
});

app.listen(3000);
