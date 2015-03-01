var cradle = require('cradle');

cradle.setup({
    host: '127.0.0.1',
    cache: true,
    raw: false,
    forceSave: true
});

// connect and select database
var c = new(cradle.Connection);
var db = c.database('nodejs');

db.exists(function (err, exists) {
    if (err) {
        console.log('error', err);
    } else if (exists) {
        console.log('database exists.');
    } else {
        console.log('database not exists.');
        db.create();
    }
});

db.get('', function(err, doc) {
	if (err) {
		console.log(err);
	}
    console.log(doc);
});

db.save('entry', {name:"cradle"}, function (err, res) {
    if (err) {
		console.log(err);
	}
    db.get('entry', function(err, doc) {
		if (err) {
			console.log(err);
		}
	    console.log(doc);
    });
});

db.save({name:"cradle"}, function(err, res) {
	if (err) {
		console.log(err);
	}
    console.log('save successful');
});

db.save([{name:"cradle"},{name:"cradle"},{name:"cradle"}], function(err, res) {
	if (err) {
		console.log(err);
	}
    console.log('bulk save successful');
});
