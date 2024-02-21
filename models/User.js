const mongoose = require('mongoose');
const Package = require('./Package');

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
    validated: Boolean,
    favorites: {
        type:[String],
        required: false
    },
    interests: {
        type:[String],
        required: false
    },
    purchases: {
        type:[String],
        required: false
    }
})
 
module.exports = User;