const express = require('express');
const auth = require('../routes/auth');
const room = require('../routes/room');
const token = require('../routes/token');
const hotel = require('../routes/hotel');
const booking = require('../routes/booking');
const attraction = require('../routes/attraction');
const package = require('../routes/package');
const ticket = require('../routes/ticket');
const user = require('../routes/user');
const tag = require('../routes/tags');
// const image = require('../routes/image')

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/token', token);
    app.use('/api/room', room);
    app.use('/api/hotel', hotel);
    app.use('/api/booking', booking);
    app.use('/api/attraction', attraction);
    app.use('/api/package', package);
    app.use('/api/ticket', ticket);
    app.use('/api/user', user);
    app.use('/api/tags', tag);
    // app.use('/api/image', image);
}