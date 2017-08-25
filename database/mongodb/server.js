const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;

const HOST = 'mongodb://127.0.0.1:27017/node';

MongoClient.connect(HOST, (err, db) => {
    if(err) throw err;

    // select a collection
    var collection = db.collection('mycollection');

    // create a document
    var doc = {key: "value"};

    // insert document in collection
    collection.insert(doc, (err, docs) => {
        if(err) throw err;
        console.log('insert: ', doc);

        // count the documents
        collection.count((err, count) => {
            if(err) throw err;
            console.log(format("count = %s", count));
        });

        // find all documents
        collection.find().toArray((err, results) => {
            if(err) throw err;
            console.log(results);
            // close database
            db.close();
        });
    });
});
