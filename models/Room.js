const mongoose = require('mongoose');

const Room = mongoose.model('Room', {
    code: String,
    title: String,
    hotel: String,
    description: String,
    rate: Number,
    price: Number,
    capacity: Number,
    doubleBed: Number,
    singleBed: Number,
    available: Boolean,
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
    }
});

module.exports = Room;