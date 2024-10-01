const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { ScoreDetails } = require("../models");

class ScoreDetailService { }

ScoreDetailService.getScoreDetails = async (req, res) => {
    // let { user_id, exam_id } = req.query;
    // const response = await ScoreDetails.find({ user_id, exam_id });
    // Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, response);
    const { user_id, exam_id } = req.query; // Only exam_id is needed to find all users who took the exam

    try {
        // Step 1: Find all users who took the exam, sorted by score (descending)
        const allScores = await ScoreDetails.find({ user_id, exam_id })
            .sort({ score: -1 }) // Sort by score in descending order
            .lean(); // Use lean to optimize query

        if (!allScores.length) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, "No scores found for this exam");
        }

        // Step 2: Initialize variables for ranking
        let rank = 1;  // The rank counter
        let rankList = []; // To store users with their rank

        // Step 3: Loop through the sorted scores and assign ranks
        for (let i = 0; i < allScores.length; i++) {
            const currentScore = allScores[i].score;

            // If not the first user, and the score differs from the previous one, increment rank
            if (i > 0 && currentScore !== allScores[i - 1].score) {
                rank = i + 1; // Increment rank based on the current index
            }

            // Assign rank to the current user
            allScores[i].rank = rank;
            rankList.push(allScores[i]); // Add the user with their rank to the list
        }

        // Step 4: Return the ranked list of users
        Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, rankList);
    } catch (error) {
        // Handle any errors during execution
        return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, error.message);
    }
}

ScoreDetailService.getScoreDetailById = async (req, res) => {
    const { _id } = req.query;
    const data = await ScoreDetails.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

ScoreDetailService.createScoreDetail = async (req, res) => {
    console.log(req);
    const data = await ScoreDetails.find({ user_id: req?.body?.user_id ,
        exam_id: req?.body?.exam_id, 
        score: req?.body?.score,
        });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const scoreDetail = await new ScoreDetails(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, scoreDetail);
}

module.exports = ScoreDetailService;