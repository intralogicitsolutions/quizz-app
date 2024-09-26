const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguagesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("languages", LanguagesSchema);