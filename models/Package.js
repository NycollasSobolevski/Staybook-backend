const mongoose = require('mongoose');

const Package = mongoose.model('Package', {
    title: String,
    details: String,
    price: Number,
    bought: Date,
    ticket: [Object],
    booking: [Object],
    attractions: [Object],
    tags: {
        type:[String],
        required: false
    },
    images: {
        type:[String],
        required: true
    },
    relevantClients: {
        type: [String],
        required: false
    }
})
 
module.exports = Package;