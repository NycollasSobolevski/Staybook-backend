const express = require('express');
const TokenController = require('../controllers/TokenController');
const router = express.Router();
 
router
    .post('/compare', TokenController.CompareToken)
    .post('/new', TokenController.CreateToken)
 
module.exports = router;