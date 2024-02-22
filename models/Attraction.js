const mongoose = require('mongoose');

const Attraction = mongoose.model('Attraction', {    
    price: Number,
    name: String,
    details: String,
    attractionLocal: String,
    image: {
        type: [String],
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    relevantClients: {
        type: [String],
        required: false
    }
});

module.exports = Attraction;