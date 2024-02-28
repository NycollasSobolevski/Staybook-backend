const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/AttractionController');

router
    .post('/', AttractionController.CreateAttraction)
    .delete('/:id', AttractionController.DeleteAttraction)
    .patch('/:id', AttractionController.UpdateAttraction)
    .get('/:id', AttractionController.GetAttraction)

module.exports = router;