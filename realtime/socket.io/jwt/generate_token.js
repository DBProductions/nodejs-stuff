const jwt = require('jsonwebtoken');
let token = jwt.sign({ user: '123' }, 'xyz123');

console.log(token);
