const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', {
    price: Number,
    seat: String,
    type: String,
    title: String,
    details: String,
    arrival: Object,
    departure: Object,
    arrivalDate: Date,
    departureDate: Date,
    tags: [Object],
    roundTrip: String
})
 
module.exports = Ticket;