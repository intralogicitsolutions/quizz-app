const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreDetailSchema = new Schema({
    user_id: {
        type: String,
       required: true,
    },
    exam_id: {
        type: String,
        required: true,
    }, 
    score: {
        type: Number,
       required: true,
    },
});

module.exports = mongoose.model("score_detail", ScoreDetailSchema);