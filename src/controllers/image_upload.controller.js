// const { ImageUploadService } = require("../services");
// const { Response } = require("../middlewares");
// const { StatusCodes, ResponseMessage } = require("../constants");
// const { Logger } = require("../helper");


// class ImageUploadController { }

// ImageUploadController.uploadImage = async (req, res) => {
//     try {
//         Logger.info(`'Upload Image' API Called`, { user_id: req?.user?._id, method: req?.method });
//         await ImageUploadService.uploadImage(req, res);
//         // Call the Multer middleware to handle file upload
//         // ImageUploadService.upload(req, res, async (error) => {
//         //     if (error) {
//         //         Logger.error(`'Upload Image' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
//         //         return res.status(StatusCodes.HTTP_BAD_REQUEST).json({
//         //             message: 'Error uploading file',
//         //             error: error.message,
//         //         });
//         //     }

//         //     // If Multer has successfully handled the file, call the service to save metadata in MongoDB
//         //     await ImageUploadService.uploadImage(req, res);
//         // });
//     } catch (error) {
//         Logger.error(`'Upload Image' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
//         Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
//     }
// }

// module.exports = ImageUploadController;

