var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// define schema
var User = new Schema({
    name: String,
    email: String
});    
var user = mongoose.model('User', User);

var HOST = 'mongodb://localhost/node';
    
mongoose.connect(HOST, function(err) {
    if (err) { throw err; }
    var userIns = new user();
    userIns.name = "Tester";
    userIns.email = "tester@localhost";
    // input
    userIns.save(function(err) {
        if (err) { throw err; }
        console.log('saved');       
    });
    // output
    user.find({}, function(err, docs) {
        if (err) { throw err; }
        for(var i = 0; i < docs.length; i++) {
            console.log(docs[i].name, docs[i].email);
        }
    }); 
});