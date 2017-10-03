const db = require('dirty')('user.db');

db.on('load', () => {
    db.on('drain', () => {
        console.log('All records are saved on disk.');
        db.close();
    });

    db.on('read_close', () => {
        console.log('After read.');
    });

    db.on('write_close', () => {
        console.log('After write.');
    });

    console.log('DB path %s', db.path);
    // set key - value
    db.set('Peter', {type: 'user'});
    console.log('Added Peter, he is a %s.', db.get('Peter').type);

    // set and remove
    db.set('Alice', {type: 'user'});
    db.rm('Alice', () => {
        console.log('Removed Alice');
    });

    db.set('Bob', {type: 'customer'});
    db.set('Peter', {type: 'customer'});

    // show entries
    db.forEach((key, val) => {
        console.log('Found key: %s, val: %j', key, val);
    });
});
