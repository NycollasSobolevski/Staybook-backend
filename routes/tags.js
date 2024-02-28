const express = require('express');
const TagController = require('../controllers/TagController');
const router = express.Router();

router
    .post('/', TagController.CreateTag)
    .get('/', TagController.GetAll)
    .patch('/:id', TagController.UpdateTag)
    .delete('/:id', TagController.DeleteTag)


module.exports = router;