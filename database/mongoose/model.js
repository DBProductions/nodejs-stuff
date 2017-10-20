module.exports = function(mongoose) {
    // define the schema
    let userSchema = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            required: [true, 'email is needed'],
            unique: true
        },
        age: {
            type: Number,
            min: 12,
            max: 70
        },
        registered_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    });
    // define a static method
    userSchema.statics.findByName = (model, name, cb) => {
        return model.find({name: new RegExp(name, 'i')}, cb);
    };
    // define a custom method
    userSchema.methods.showUser = function(cb) {
        let user = (this.email || 'no name') + ' ' + (this.email || 'no email');
        cb(null, user);
    };
    // save preprocessing
    userSchema.pre('save', (next) => {
        console.log('before saving');
        next();
    });
    // save postprocessing
    userSchema.post('save', (doc, next) => {
        console.log('after saving', doc);
        next();
    });
    // return the model
    return mongoose.model('User', userSchema);
};
