var filed = require('filed');

var f = filed(__dirname + '/data.txt')
f.write('test\n')
f.write('test')
f.end()