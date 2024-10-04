const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamResultSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
       required: true,
    },
    exam_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }, 
    score: {
        type: Number,
       required: true,
    },
    rank: {
        type: Number,
        required: false,
    },
    result: [
        {
            question_id: {
                type: mongoose.Schema.Types.ObjectId, 
                required: true,
            },
            user_answer: {
                type: String,
                required: true,
            }
        },
    ]
});

module.exports = mongoose.model("exam_result", ExamResultSchema);