const mongoose = require('mongoose');
 
const Token = mongoose.model('Token', {
    code: String,
    user: String,
    expires: Number
})
 
module.exports = Token;