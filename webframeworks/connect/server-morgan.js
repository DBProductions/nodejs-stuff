const connect = require('connect');
const morgan = require('morgan');
const fs = require('fs');
const app = connect();
const PORT = 3000;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Response from connect with morgan logging');
});

app.listen(PORT);
