var db = require('dirty')('user.db');

db.on('load', function() {
    db.on('drain', function() {
        console.log('All records are saved on disk.');
        db.close(); 
    });

    db.on('read_close', function() {
        console.log('After read.');
    });

    db.on('write_close', function() {
        console.log('After write.');
    });
    
    console.log('DB path %s', db.path);
    // set key - value
    db.set('Peter', {type: 'user'});
    console.log('Added Peter, he is a %s.', db.get('Peter').type);
    
    // set and remove
    db.set('Alice', {type: 'user'});
    db.rm('Alice', function() {
        console.log('Removed Alice');        
    });
    
    db.set('Bob', {type: 'customer'});
    db.set('Peter', {type: 'customer'});

    // show entries
    db.forEach(function(key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
});
