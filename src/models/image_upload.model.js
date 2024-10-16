const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageUploadSchema  = new Schema({
    // image_path:{
    //     type: String,
    //     required: true
    // }
    filename: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    
});

module.exports = mongoose.model('imageupload', ImageUploadSchema);
