const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users_schema = new Schema({
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
    }
});

module.exports = mongoose.model("users", users_schema);