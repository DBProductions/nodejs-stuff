var finder = require('findit')(__dirname);

finder.on('directory', function (dir, stat) {
    console.log(dir + '/');
});

finder.on('file', function (file, stat) {
    console.log(file);
});

finder.on('link', function (link, stat) {
    console.log(link);
});

finder.on('error', function (err) {
    console.log(err);
});
