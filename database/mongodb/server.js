var MongoClient = require('mongodb').MongoClient,
    format = require('util').format; 

MongoClient.connect('mongodb://127.0.0.1:27017/nodejs', function(err, db) {
    if(err) throw err;

    var doc = {key:"value"};

    var collection = db.collection('mycollection');
    
    collection.insert(doc, function(err, docs) {
   
        console.log('insert: ', doc);

        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });
   
        collection.find().toArray(function(err, results) {
            console.dir(results);
            db.close();
        });      
    });
});