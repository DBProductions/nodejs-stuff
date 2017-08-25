const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.get('/', (req, res) => {
    res.render('index.ejs', {title: 'Express - Ejs'});
});

app.listen(3000);
