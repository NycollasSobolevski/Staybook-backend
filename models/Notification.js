const mongoose = require('mongoose');

const Notification = mongoose.model('Notification', {
    topic: String,
    date: Date,
    message: String    
});