const mongoose = require('mongoose');

const Attraction = mongoose.model('Attraction', {    
    price: Number,
    name: String,
    details: String,
    attractionLocal: Object,
    image: {
        type: [String],
        required: false
    },
    tags: [Object],
    relevantClients: [Object]
});

module.exports = Attraction;