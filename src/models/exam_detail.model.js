const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamDetailSchema = new Schema({
    exam_name: {
        type: String,
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

module.exports = mongoose.model("exam_details", ExamDetailSchema);