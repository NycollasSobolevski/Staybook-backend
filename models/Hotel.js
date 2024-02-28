const mongoose = require('mongoose');
const Room = require('./Room');

const Hotel = mongoose.model('Hotel', {
    title: String,
    description: String,
    rate: Number,
    startingPrice: Number,
    tags: [Object],
    rooms: [Object],      
    contact: {
        type:[String],
        required: true
    },
    image: {
        type:[String],
        required: true
    },
    location: [Object],
    relevantClients: {
        type: [String],
        required: false
    }
});

module.exports = Hotel;