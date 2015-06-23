var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var HOST = 'mongodb://127.0.0.1/node';

// define schema
var User = new Schema({
    name: String,
    email: String,
    regdate: { type: Date, default: Date.now },
});
// create model
var user = mongoose.model('User', User);
    
mongoose.connect(HOST, function(err) {
    if (err) throw err;

    // create document
    var userIns = new user();
    userIns.name = "Tester";
    userIns.email = "tester@localhost";
    
    // save document
    userIns.save(function(err) {
        if (err) throw err;
        console.log('saved');       

        // find all
        user.find({}, function(err, docs) {
            if (err) throw err;
            for(var i = 0; i < docs.length; i++) {
                console.log(docs[i].name, docs[i].email, docs[i].regdate);
            }
            process.exit();
        }); 
    });
});