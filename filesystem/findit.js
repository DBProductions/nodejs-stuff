/**
 * walk a directory tree recursively with events
 */
const finder = require('findit')(__dirname);

finder.on('directory', (dir, stat) => {
    console.log(dir + '/');
});

finder.on('file', (file, stat) => {
    console.log(file);
});

finder.on('link', (link, stat) => {
    console.log(link);
});

finder.on('error', (err) => {
    console.log(err);
});
