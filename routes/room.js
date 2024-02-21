const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router
    .post('/', RoomController.Create)
    .post('/getAll', RoomController.GetAll)
    .post('/get', RoomController.GetRange)
    .post('/getRoom', RoomController.GetRoom)

module.exports = router;