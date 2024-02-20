const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');

router
    .post('/', HotelController.Create)
    .post('/getAll', HotelController.GetAll)
    .post('/get', HotelController.GetRange)

module.exports = router;