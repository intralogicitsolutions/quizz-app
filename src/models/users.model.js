const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image_path:{
        type: String,
        required: false
    },
    // reset_token: {
    //     type: String,
    // },
    // reset_token_expires: {
    //     type: Date,
    // },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    //    required: true,
    },
    isLoggedOut: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
    },
    otp_expires: {
        type: Date,
    }
    
});

module.exports = mongoose.model("users", UsersSchema);