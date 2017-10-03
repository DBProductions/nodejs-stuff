module.exports = function(mongoose) {
    // define the schema
    let userSchema = new mongoose.Schema({
        name: String,
        email: {
            type: String,
            required: [true, 'email is needed']
        },
        age: {
            type: Number,
            min: 12,
            max: 70
        },
        registerdate: {
            type: Date,
            default: Date.now
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
    // return the model
    return mongoose.model('User', userSchema);
};
