const { ScoreDetailService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class ScoreDetailController { }

ScoreDetailController.getScoreDetails = async (req, res) => {
    try {
        Logger.info(`'Get ScoreDetails' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ScoreDetailService.getScoreDetails(req, res);
    } catch (error) {
        Logger.error(`'Get ScoreDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ScoreDetailController.getScoreDetailById = async (req, res) => {
    try {
        Logger.info(`'Get ScoreDetails By Id' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ScoreDetailService.getScoreDetailById(req, res);
    } catch (error) {
        Logger.error(`'Get ScoreDetail By Id' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ScoreDetailController.createScoreDetail = async (req, res) => {
    try {
        Logger.info(`'Create ExamDetail' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ScoreDetailService.createScoreDetail(req, res);
    } catch (error) {
        Logger.error(`'Create ExamDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}


module.exports = ScoreDetailController;