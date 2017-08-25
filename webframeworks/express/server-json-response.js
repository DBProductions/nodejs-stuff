const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

let routes = express.Router();

routes.get('/', (req, res) => {
    res.json({success: true, ts: +new Date()});
});

app.use('/api', routes);

app.listen(3000);
