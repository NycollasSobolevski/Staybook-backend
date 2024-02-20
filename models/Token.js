const mongoose = require('mongoose');
 
const Token = mongoose.model('Token', {
    code: String,
    expires: Number,
    user: String 
})
 
module.exports = Token;