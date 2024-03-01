const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
const Image = require('../models/Image')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../config/s3');

class ImageController {
    static generateFileName(bytes = 32) {
        return crypto.randomBytes(bytes).toString('hex');
    }

    static async Get(req, res) {

        const posts = await Image.getPosts(); 
        for (let post of posts) {
            post.imageUrl = await getObjectSignedUrl(post.imageName);
        }
        res.send(posts);
    }

    static async Create(req, res) {
        const file = req.file;
        const caption = req.body.caption;
        const imageName = ImageController.generateFileName();

        const fileBuffer = await sharp(file.buffer)
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();

        await uploadFile(fileBuffer, imageName, file.mimetype);

        const post = await Image.createPost({ imageName, caption }); 
        
        res.status(201).send(post);
    }

    static async Delete(req, res) {
        const id = req.params.id;

        const post = await Image.findPostById(id); 

        await deleteFile(post.imageName);

        await Image.deletePost(id); 
        res.send(post);
    }
}

module.exports = ImageController;
