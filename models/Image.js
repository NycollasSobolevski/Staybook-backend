const mongoose = require('mongoose');

const Image = mongoose.model('Image', {
    imageName: String,
    caption: String
});

module.exports = Image;