const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;

const HOST = 'mongodb://127.0.0.1:27017/node';

MongoClient.connect(HOST, (err, db) => {
    if(err) throw err;

    // create model
    var user = require('mongolia').model(db, 'users');

    user.beforeInsert = (documents, callback) => {
	    documents.forEach((doc) => {
	        doc.created_at = +new Date();
	    });
	    callback(null, documents);
	};

    user.mongo({method: 'insert', hooks: true}, {name: 'mongolia'}, (err, result) => {

        console.log(result);

        user.mongo({method: 'findArray', hooks: true}, {name: 'mongolia'}, (err, docs) => {
            console.log(docs);
            // close database
            db.close();
        });
    });
});
