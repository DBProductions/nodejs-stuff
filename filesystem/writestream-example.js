var fs = require('fs');

var wstream = fs.createWriteStream('data.txt');

wstream.write('Write with streams\n');
wstream.write('Second line\n');
wstream.end();