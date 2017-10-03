const mongoose = require('mongoose');
const userModel = require('./model')(mongoose);
const HOST = 'mongodb://127.0.0.1/node';

// Use native promises
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// define event handling
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});
mongoose.connection.on('error', (error) => {
    console.log('MongoDB Error');
});
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// connect
mongoose.connect(HOST);

// use a static method from the model
userModel.findByName(userModel, 'Tester', (err, user) => {
    console.log(user);
});

// create document with missing email
let userIns = new userModel({name: 'Tester'});

// save document with error
userIns.save((err) => {
    if (err) {
        let errors = Object.keys(err.errors);
        errors.forEach((val) => {
            console.log(err.errors[val].message);
        });
    }
    // add property and save again
    userIns.email = 'test@testing.com';
    userIns.save((err) => {
        if (err) throw err;

        // find all documents
        userModel.find({}, (err, docs) => {
            if (err) throw err;
            docs.forEach((value) => {
                console.log(value);
            });
            process.exit();
        });
    });
});
