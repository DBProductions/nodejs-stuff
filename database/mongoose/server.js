const mongoose = require('mongoose');
const userModel = require('./model')(mongoose);
const HOST = 'mongodb://127.0.0.1/node';

// Use native promises
mongoose.Promise = global.Promise;

// connect
mongoose.connect(HOST);

// create document
let userIns = new userModel({name: 'Tester'});
//userIns.email = 'test@testing.com';

// save document
userIns.save((err) => {
    if (err) {
        let errors = Object.keys(err.errors);
        errors.forEach((val) => {
            console.log(err.errors[val].message);
        });
    }
    // find all documents
    userModel.find({}, (err, docs) => {
        if (err) throw err;
        docs.forEach((value) => {
            console.log(value);
        });
        process.exit();
    });
});
