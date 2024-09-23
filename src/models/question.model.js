const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question_schema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answers: {
        type: Array,
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    },
    language_id: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("questions", Question_schema);