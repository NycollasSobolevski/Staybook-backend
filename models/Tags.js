const mongoose = require('mongoose');

const Tag = mongoose.model('Tag', {    
    price: Number,
    name: String,
    details: String
});

module.exports = Tag;