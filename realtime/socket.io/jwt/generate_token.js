var jwt = require('jsonwebtoken');
var token = jwt.sign({ user: '123' }, 'xyz123');

console.log(token);
