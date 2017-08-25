const connect = require('connect');
const morgan = require('morgan');
const fs = require('fs');

const app = connect();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect response with morgan');
});

app.listen(3000);
