var MongoClient = require('mongodb').MongoClient,
    format = require('util').format; 

var HOST = 'mongodb://127.0.0.1:27017/node';

MongoClient.connect(HOST, function(err, db) {
    if(err) throw err;

    // create model
    var user = require('mongolia').model(db, 'users');

    user.beforeInsert = function (documents, callback) {
	    documents.forEach(function (doc) {
	        doc.created_at = +new Date();
	    });
	    callback(null, documents);
	};
    
    user.mongo({method: 'insert', hooks: true}, {name: 'mongolia'}, function(err, result) {
        
        console.log(result);
        
        user.mongo({method: 'findArray', hooks: true}, {name: 'mongolia'}, function(err, docs) {
            console.log(docs); 
        
            // close database
            db.close();
        });        
    });
    
});
