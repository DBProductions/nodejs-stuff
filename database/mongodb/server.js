var MongoClient = require('mongodb').MongoClient,
    format = require('util').format; 

var HOST = 'mongodb://127.0.0.1:27017/nodejs';

MongoClient.connect(HOST, function(err, db) {
    if(err) throw err;
    
    // select a collection
    var collection = db.collection('mycollection');

    // create a document
    var doc = {key:"value"};
    
    // insert document in collection
    collection.insert(doc, function(err, docs) {
        console.log('insert: ', doc);
        
        // count the documents
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // find all documents
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // close database
            db.close();
        });      
    });
});