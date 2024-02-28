const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');

router
    .post('/', HotelController.Create)
    .post('/filter/:page&:limit', HotelController.GetHotelsWithPaginationAndTags)
    .get('/', HotelController.GetAll)
    .get('/:page&:limit', HotelController.GetRange)

module.exports = router;