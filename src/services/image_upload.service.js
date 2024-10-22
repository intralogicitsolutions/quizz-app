// const { Response } = require("../middlewares");
// const { StatusCodes, ResponseMessage } = require("../constants");
// const { ImageUpload } = require("../models");
// const multer = require('multer');
// const path = require('path');



// const { ImageUpload } = require("../models");
// const multer = require('multer');
// const path = require('path');

// // Configure Multer for file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads')); // Store images in the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname); // Create a unique filename
//     }
// });

// const upload = multer({ storage: storage });

// // Upload function
// class ImageUploadService { }

// ImageUploadService.upload = upload.single('file'); // Handle single file upload (make sure to use the correct form field name)

// // Upload image handler
// ImageUploadService.uploadImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const image = new ImageUpload({
//             filename: req.file.filename,
//             path: req.file.path,
//             originalName: req.file.originalname,
//         });

//         const savedImage = await image.save();

//         return res.status(200).json({
//             message: 'Image uploaded successfully',
//             data: {
//                 _id: savedImage._id,
//                 filename: savedImage.filename,
//                 path: savedImage.path,
//                 originalName: savedImage.originalName,
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error uploading image',
//             error: error.message,
//         });
//     }
// };

// module.exports = ImageUploadService;


const { ImageUpload } = require("../models");
const path = require('path'); 

// Multer configuration for image uploads
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Controller function for uploading an image
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  const img_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const image = new ImageUpload({
    filename: req.file.filename,
    path: req.file.path,
    originalName: req.file.originalname,  
    img_url: img_url,
  });

  // Save image metadata to MongoDB
  image.save()
    .then((result) => {
      res.status(200).json({
        message: 'Image uploaded successfully',
        data: {
          _id: result._id,
          filename: result.filename,
          path: result.path,
          originalName: result.originalName,
          img_url: result.img_url,
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error uploading image',
        error: error.message,
      });
    });
};

module.exports = {
  uploadImage,
  upload, // Export multer configuration
};
