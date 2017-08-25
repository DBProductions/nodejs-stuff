const fs = require('fs');

let wstream = fs.createWriteStream('data.txt');

wstream.write('Write with streams\n');
wstream.write('Second line\n');
wstream.end();
