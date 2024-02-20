const express = require('express');
const auth = require('../routes/auth');
const room = require('../routes/room');
const token = require('../routes/token');
const hotel = require('../routes/hotel');
const booking = require('../routes/booking');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/token', token);
    app.use('/api/room', room);
    app.use('/api/hotel', hotel);
    app.use('/api/booking', booking);
}