/**
 * simple directory iteration with display the size of the file
 *
 * node readdir-example.js [directory]
 */
var fs = require('fs');

var dir = './';
var args = process.argv.slice(2);
if (args[0]) {    
    dir = args[0];
    if (args[0].lastIndexOf('/') !== args[0].length - 1) { 
        dir = dir + '/'; 
    }
}

fs.readdir(dir, function(err, files) {
    if(err) { throw err; }
    var countFiles = 0;
    files.forEach(function(file) {        
        countFiles += 1;
        fs.stat(dir + file, function(err, stats) {
            if (err) { throw err; }
            console.log(file + ' (' + stats.size + ' Bytes)');
        });        
    });
    console.log(countFiles + ' file in directory ' + dir);
});
