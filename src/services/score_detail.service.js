const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { ScoreDetails } = require("../models");

class ScoreDetailService { }


// ScoreDetailService.getScoreDetails = async (req, res) => {
//     const { exam_id, user_id} = req.query; // Get the exam_id and user_id from the query

//     try {
//         // Step 1: Find all scores for the specified exam, sorted by score (descending)
//         const allScores = await ScoreDetails.find({ exam_id })
//             .sort({ score: -1 }) // Sort by score in descending order
//             .lean(); // Use lean to optimize query

//         if (!allScores.length) {
//             return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, "No scores found for this exam");
//         }

//         // Step 2: Initialize variables for ranking
//         let rankList = []; // To store users with their rank
//         let currentRank = 1; // Start with rank 1

//         // Step 3: Loop through the sorted scores and assign ranks
//         for (let i = 0; i < allScores.length; i++) {
//             const currentScore = allScores[i].score;

//             // Assign rank
//             if (i === 0 || currentScore !== allScores[i - 1].score) {
//                 allScores[i].rank = currentRank; // Assign the current rank to the user
//             } else {
//                 allScores[i].rank = currentRank; // Maintain the same rank for ties
//             }

//             // Update the rank for the next iteration
//             if (currentScore !== allScores[i + 1]?.score) {
//                 currentRank++;
//             }

//             // Push the user with their score and rank into the rankList
//             rankList.push(allScores[i]);
//         }

//         // Step 4: Find the rank for the specific user
//         const userScore = rankList.find(score => score.user_id === user_id); // Get the user's score details
//         if (!userScore) {
//             return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, "User not found for this exam");
//         }

//         // Step 5: Return the rank of the specified user
//         Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, {
//             user_id: userScore.user_id,
//             exam_id: userScore.exam_id,
//             score: userScore.score,
//             rank: userScore.rank
//         });
//     } catch (error) {
//         // Handle any errors during execution
//         return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, error.message);
//     }
// };

ScoreDetailService.getScoreDetails = async (req, res) => {
    let { user_id, exam_id, score} = req.query;
    const response = await ScoreDetails.find({ user_id, exam_id, score });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, response);
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

ScoreDetailService.updateScoreDetail = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await ScoreDetails.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

module.exports = ScoreDetailService;