var fs = require('fs');

fs.writeFile('filesexample.txt', 'Node works with files!', function (err) {
    if (err) { throw err; }
    console.log('file saved!');
});

fs.stat('filesexample.txt', function(err, stats) {
    if (err) { throw err; }
    console.log(stats);
});

fs.readFile('filesexample.txt', 'utf-8', function (err, data) {
    if (err) { throw err; }
    console.log(data);
    fs.rename("filesexample.txt", "files.txt", function (err) {
        if (err) { throw err; }
        console.log('file renamed');
        // clean up
        fs.unlink('files.txt', function(err) {
            if (err) { throw err; }
            console.log('file removed');
        });
    });
});
