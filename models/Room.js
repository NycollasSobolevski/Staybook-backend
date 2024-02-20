const mongoose = require('mongoose');

const Room = mongoose.model('Room', {
    title: String,
    code: String,
    capacity: Number,
    doubleBed: Number,
    singleBed: Number,
    price: Number,
    rate: Number,
    hotel: String,
    description: String,
    location: {
        type:[String],
        required: false
    },
    category: {
        type:[String],
        required: true
    },
    image: {
        type:[String],
        required: true
    },
    available: Boolean
});

module.exports = Room;