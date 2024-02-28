const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/HotelController');

router
    .post('/', HotelController.Create)
    .get('/', HotelController.GetAll)
    .get('/:page&:limit', HotelController.GetRange)
    .post('/filtered/:page&:limit', HotelController.GetHotelsWithPaginationAndTags)

module.exports = router;