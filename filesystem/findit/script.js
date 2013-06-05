/**
 * callback
 */
require('findit').find(__dirname, function (file) {
    console.log(file);
});

/**
 * event emitter
 */
var finder = require('findit').find(__dirname);

finder.on('directory', function (dir, stat) {
    console.log(dir + '/');
});

finder.on('file', function (file, stat) {
    console.log(file);
});

finder.on('link', function (link, stat) {
    console.log(link);
});

/**
 * syncron
 */
var files = require('findit').sync(__dirname);
    console.dir(files);