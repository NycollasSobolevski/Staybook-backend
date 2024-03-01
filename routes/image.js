const express = require('express');
const multer = require('multer');
const ImageController = require('../controllers/ImageController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router
    .post('/', upload.single('image'), ImageController.Create)
    .get('/', ImageController.Get)
    .delete('/:id', ImageController.Delete);

module.exports = router;
