var db = require('dirty')('user.db');

db.on('load', function() {
    db.set('Peter', {type: 'user'});
    console.log('Added Peter, he is a %s.', db.get('Peter').type);

    db.set('Alice', {type: 'user'});
    db.rm('Alice', function() {
        console.log('Removed Alice');        
    });
    
    db.set('Bob', {type: 'customer'}, function() {
        console.log('User bob is now saved on disk.');
        db.forEach(function(key, val) {
            console.log('Found key: %s, val: %j', key, val);
        });
    });

    db.on('drain', function() {
        console.log('All records are saved on disk.');
        db.close(); 
    });
});
