var fs = require('fs');

var readStream = fs.createReadStream('data.txt');

readStream.pipe(process.stdout);