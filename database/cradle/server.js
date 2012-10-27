var cradle = require('cradle');

new(cradle.Connection)('http://localhost', 5984, {
	cache: true,
	raw: false
});

var c = new(cradle.Connection);

var db = c.database('nodejs');

db.get('', function(err, doc) {
	console.log(doc);
});

db.save({name:"cradle"}, function(err, res) {
	console.log('save successful');
});

db.save([{name:"cradle"},
        {name:"cradle"},
        {name:"cradle"}], function(err, res) {
	console.log('bulk save successful');
});
