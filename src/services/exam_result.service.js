const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { ExamResults } = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

class ExamResultService { }

ExamResultService.getExamResults = async (req, res) => {
    let { user_id, exam_id } = req.query;

    user_id = ObjectId.createFromHexString(user_id);
    exam_id = ObjectId.createFromHexString(exam_id);


    if (!user_id || !exam_id) {
        return res.status(400).json({ message: "user_id and exam_id are required" });
    }

    try {
        const userResult = await ExamResults.aggregate([
            {
                $match: { user_id, exam_id } 
            },
            {
                $unwind: "$result" 
            },
            {
                $lookup: {
                    from: "questions", 
                    localField: "result.question_id", 
                    foreignField: "_id",
                    as: "questionDetails"
                }
            },
            {
                $unwind: { path: "$questionDetails", preserveNullAndEmptyArrays: true } 
            },
            {
                $group: {
                    _id: { user_id: "$user_id", exam_id: "$exam_id", score: "$score" },
                    results: {
                        $push: {
                            user_answer: { $ifNull: ["$result.user_answer", null] }, 
                            question: { $ifNull: ["$questionDetails.question", null] }, 
                            options: { $ifNull: ["$questionDetails.options", null] }, 
                            correct_answer: { $ifNull: ["$questionDetails.correct_answer", null] } ,
                        }
                    }
                }
            }
        ]);

        console.log("User Result:", userResult);

        if (!userResult.length) {
            return res.status(404).json({ message: "Result not found for this user and exam" });
        }

        const userDetails = userResult[0];

    
        const allResults = await ExamResults.find({ exam_id }).sort({ score: -1 });

        let rank = 1;
        for (let i = 0; i < allResults.length; i++) {
            if (allResults[i].score > userDetails._id.score) {
                rank++;
            } else {
                break;
            }
        }

        res.json({
            message: "Exam result fetched successfully",
            user_id: userDetails._id.user_id,
            exam_id: userDetails._id.exam_id,
            score: userDetails._id.score,
            rank: rank,
            result: userDetails.results // Contains results with question details
        });

    } catch (error) {
        console.error("Error fetching exam results:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

ExamResultService.getExamResultById = async (req, res) => {
    const { _id } = req.query;
    const data = await ExamResults.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

ExamResultService.createExamResult = async (req, res) => {
    try {
        const { user_id, exam_id, score, result } = req.body;

    //     user_id = ObjectId.createFromHexString(user_id);
    //    exam_id = ObjectId.createFromHexString(exam_id);

        // if (!user_id || !exam_id || !score || !result) {
        //     return res.status(400).json({ message: "All fields (user_id, exam_id, score, result) are required" });
        // }

        const existingResult = await ExamResults.findOne({ user_id, exam_id });
        // if (existingResult) {
        //     return res.status(400).json({ message: "Exam result for this user already exists." });
        // }

        const examResult = new ExamResults({
            user_id,
            exam_id,
            score,
            result: result.map(item => ({ 
                question_id: item.question_id,
                user_answer: item.user_answer
            })),
        });

        const savedExamResult = await examResult.save();

        //await examResult.save();

        return res.status(201).json({
            message: "Exam result created successfully",
            data: {
                _id: savedExamResult._id,
                user_id: savedExamResult.user_id,
                exam_id: savedExamResult.exam_id,
                score: savedExamResult.score,
                result: savedExamResult.result.map(item => ({
                    question_id: item.question_id,
                    user_answer: item.user_answer,
                    _id: item._id
                })),
            }
        });
    } catch (error) {
        console.error("Error creating exam result:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

ExamResultService.updateExamResult = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await ExamResults.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

ExamResultService.deleteExamResult = async (req, res) => {
    const { _id } = req.query;
    await ExamResults.findOneAndDelete({ _id });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS);
}

module.exports = ExamResultService;




