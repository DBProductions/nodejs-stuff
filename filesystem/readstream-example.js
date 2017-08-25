const fs = require('fs');

let readStream = fs.createReadStream('data.txt');

readStream.pipe(process.stdout);
