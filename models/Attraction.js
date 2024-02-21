const mongoose = require('mongoose');

const Attraction = mongoose.model('Attraction', {    
    Name: String,
    price: Number,
    details: String,
    image: {
        type: [String],
        required: false
    }
});

module.exports = Attraction;