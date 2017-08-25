const fs = require('fs');

fs.writeFile('filesexample.txt', 'Node works with files!', (err) => {
    if (err) { throw err; }
    console.log('file saved!');
});

fs.stat('filesexample.txt', (err, stats) => {
    if (err) { throw err; }
    console.log(stats);
});

fs.readFile('filesexample.txt', 'utf-8', (err, data) => {
    if (err) { throw err; }
    console.log(data);
    fs.rename("filesexample.txt", "files.txt", (err) => {
        if (err) { throw err; }
        console.log('file renamed');
        // clean up
        fs.unlink('files.txt', (err) => {
            if (err) { throw err; }
            console.log('file removed');
        });
    });
});
