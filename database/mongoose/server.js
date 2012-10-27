var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var User = new Schema({
	name: String,
	email: String
});    
var user = mongoose.model('User', User);
    
mongoose.connect('mongodb://localhost/node', function(err) {
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