const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HOST = 'mongodb://127.0.0.1/node';

// define schema
let User = new Schema({
    name: String,
    email: String,
    regdate: { type: Date, default: Date.now },
});
// create model
let user = mongoose.model('User', User);

// connect
mongoose.connect(HOST);

// create document
var userIns = new user();
userIns.name = "Tester";
userIns.email = "tester@localhost";

// save document
userIns.save((err) => {
    if (err) throw err;
    console.log('saved');
    // find all documents
    user.find({}, (err, docs) => {
        if (err) throw err;
        for(var i = 0; i < docs.length; i++) {
            console.log(docs[i].name, docs[i].email, docs[i].regdate);
        }
        process.exit();
    });
});
