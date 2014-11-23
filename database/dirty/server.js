var db = require('dirty')('user.db');

db.on('load', function() {
    db.set('Peter', {eyes: 'blue'});
    console.log('Added Peter, he has %s eyes.', db.get('Peter').eyes);
	
    db.set('bob', {eyes: 'brown'}, function() {
        console.log('User bob is now saved on disk.');
    });

    db.forEach(function(key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
});

db.on('drain', function() {
    console.log('All records are saved on disk now');
});
