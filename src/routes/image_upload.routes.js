const ImageUploadRoute = require('express').Router();
// const { ImageUploadController } = require('../controllers');
const ImageUploadService = require('../services/image_upload.service');
// const { ImageUploadService } = require('../services');

ImageUploadRoute.post('/upload',ImageUploadService.upload.single('image'), ImageUploadService.uploadImage);

module.exports = ImageUploadRoute;