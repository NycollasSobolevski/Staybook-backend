const mongoose = require('mongoose');
const Attraction = require('./Attraction');

const Package = mongoose.model('Package', {
    name: String,
    details: String,
    ticket: String,
    booking: String,
    price: Number,
    attractions: {
        type:[String],
        required: false
    },
    images: {
        type:[String],
        required: true
    },
    bought: Date
})
 
module.exports = Package;