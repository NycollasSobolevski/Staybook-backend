const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', {
    price: Number,
    seat: String,
    type: String,
    title: String,
    details: String,
    arrival: String,
    departure: String,
    roundTrip: String,
    arrivalDate: Date,
    departureDate: Date,
    tags: {
        type:[String],
        required: true
    }
})
 
module.exports = Ticket;