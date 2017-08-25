/**
 * simple directory iteration and displaying the size of the file
 *
 * node readdir-example.js [directory]
 */
const fs = require('fs');

let dir = './';
let args = process.argv.slice(2);
if (args[0]) {
    dir = args[0];
    if (args[0].lastIndexOf('/') !== args[0].length - 1) {
        dir = dir + '/';
    }
}

fs.readdir(dir, (err, files) => {
    if (err) { throw err; }
    var countFiles = 0;
    files.forEach((file) => {
        countFiles += 1;
        fs.stat(dir + file, (err, stats) => {
            if (err) { throw err; }
            console.log(file + ' (' + stats.size + ' Bytes)');
        });
    });
    console.log(countFiles + ' file in directory ' + dir);
});
