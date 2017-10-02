module.exports = function(mongoose) {
    // return the model
    return mongoose.model('User', {
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
};
