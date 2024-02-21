const mongoose = require('mongoose');

const Notification = mongoose.model('Notification', {
    topic: String,
    date: { type: Date, default: Date.now() },
    message: String
});

module.exports = Notification;