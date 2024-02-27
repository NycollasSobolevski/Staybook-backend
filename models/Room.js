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
    tags: [Object],
    location: Object,
    category: [String],
    image: [String]
});

module.exports = Room;