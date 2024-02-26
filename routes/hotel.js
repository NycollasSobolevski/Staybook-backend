const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');

router
    .post('/', HotelController.Create)
    .get('/', HotelController.GetAll)
    .get('/:start&:end', HotelController.GetRange)

module.exports = router;