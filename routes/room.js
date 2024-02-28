const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router
    .post('/', RoomController.Create)
    .get('/', RoomController.GetAll)
    .get('/:start&:end', RoomController.GetRange)
    .get('/:code', RoomController.GetRoom)

module.exports = router;