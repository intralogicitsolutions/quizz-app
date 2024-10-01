const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { RankDetails } = require("../models");

class RankDetailService { }

RankDetailService.getRankDetails = async (req, res) => {
    try {
        const { exam_id, score_id } = req.query;

        if (!exam_id || !score_id) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, "exam_id and score_id are required.");
        }

        const rankDetail = await RankDetails.findOne({ _id: score_id, exam_id });

        if (!rankDetail) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, "Score detail not found.");
        }

        const allScores = await RankDetails.find({ exam_id }).sort({ score: -1 });

        let rank = 1; // Initialize rank
        for (const score of allScores) {

            if (score.score > rankDetail.score) {
                rank++;
            } else if (score.score === rankDetail.score && score._id.toString() !== score_id) {
                continue;
            }
        }

        const response = {
            score_id: rankDetail._id,
            exam_id: rankDetail.exam_id,
            score: rankDetail.score,
            rank: rank, 
        };

        Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
        console.error("Error in getRankDetails:", error);
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}



RankDetailService.getRankDetailById = async (req, res) => {
    const { _id } = req.query;
    const data = await RankDetails.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

RankDetailService.createRankDetail = async (req, res) => {
    console.log(req);
    const data = await RankDetails.find({
        score_id: req?.body?.score_id,
        exam_id: req?.body?.exam_id, 
        score: req?.body?.score,
        });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const RankDetail = await new RankDetails(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, RankDetail);
}

module.exports = RankDetailService;