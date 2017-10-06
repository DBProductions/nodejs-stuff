const connect = require('connect');
const app = connect();
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/', (req, res) => {
    res.end(`{"success": true, "ts":${Date.now()}}`);
});

app.listen(PORT);
