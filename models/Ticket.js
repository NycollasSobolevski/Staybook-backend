const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', {
    details: String,
    seat: Number,
    arrivalDate: Date,
    departureDate: Date,
    tags: {
        type:[String],
        required: true
    },
    price: Number,
    type: String,
    name: String,
    image: {
        type: [String],
        required: false
    }
})
 
module.exports = Ticket;