const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languages_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("languages", languages_schema);