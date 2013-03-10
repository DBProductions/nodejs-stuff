var mongo = require('mongodb'),
    db = new mongo.Db('mydb', new mongo.Server('127.0.0.1', 27017, {safe: false}), {});

db.open(function() {
    db.collection('mycollection', function(err, collection) {
        doc = {key:"value"};
        collection.insert(doc, function() {
            console.log('insert: ', doc);
        });

        collection.count({}, function(err, doc) {
            console.log(doc);
        });

        collection.find({}).toArray(function(err, results) {
            console.log(results);
            db.close();
        });
    });    
});