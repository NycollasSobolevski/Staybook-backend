const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
    validated: Boolean,
    favorites: {
        type:[String],
        required: false
    }
})
 
module.exports = User;