const mongoose = require('mongoose');

const Booking = mongoose.model('Booking', {    
    startDate: String,
    endDate: String,
    user: String,
    numberChildren: Number,
    numberAdults: Number,
    tags: [Object],
    rooms: {
        type:[String],
        required: true
    }
});

module.exports = Booking;