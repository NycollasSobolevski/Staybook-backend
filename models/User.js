const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: String,
    username: String,
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
        type:[Object],
        required: false
    },
    notifications: [Object]
})
 
module.exports = User;