const mongoose = require('mongoose');
const Ticket = require('./Ticket');
const Booking = require('./Booking');
const Attraction = require('./Attraction');

const Package = mongoose.model('Package', {
    name: String,
    details: String,
    ticket: Ticket,
    booking: Booking,
    price: Number,
    attractions: {
        type:[Attraction],
        required: false
    },
    images: {
        type:[String],
        required: true
    },
    bought: Date
})
 
module.exports = Package;