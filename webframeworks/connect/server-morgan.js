var connect = require('connect');
var morgan = require('morgan');
var fs = require('fs');

var app = connect();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
 
app.use('/', function main(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('connect response with morgan');
});
 
app.listen(3000);