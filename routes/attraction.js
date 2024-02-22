const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/AttractionController');

router
    .post('/', AttractionController.CreateAttraction)
    .delete('/', AttractionController.DeleteAttraction)
    .patch('/', AttractionController.UpdateAttraction)
    .get('/', AttractionController.GetAttraction)

module.exports = router;