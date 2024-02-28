const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router
    .post('/', UserController.Notify)
    .post('/purchase', UserController.Purchase)
    .patch('/', UserController.UpdateUser)
    .get('/', UserController.GetUser)

module.exports = router;