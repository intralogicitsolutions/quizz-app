const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankDetailSchema = new Schema({
    score_id: {
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

module.exports = mongoose.model("rank_detail", RankDetailSchema);