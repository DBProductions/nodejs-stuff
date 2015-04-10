var db = require('monk')('localhost/nodejs');
var users = db.get('users');

// create a document
var doc = {key: "value"};

// insert document in collection
users.insert(doc);

// find all documents
users.find({}, function (err, docs) {
	if(err) throw err;
    console.log(docs);
    db.close();
});

users.remove({ name: 'Loki' });
