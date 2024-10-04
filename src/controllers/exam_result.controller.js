const { ExamResultService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class ExamResultController { }

ExamResultController.getExamResults = async (req, res) => {
    try {
        Logger.info(`'Get ExamResults' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamResultService.getExamResults(req, res);
    } catch (error) {
        Logger.error(`'Get ExamResult' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamResultController.getExamResultById = async (req, res) => {
    try {
        Logger.info(`'Get ExamResults By Id' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamResultService.getExamResultById(req, res);
    } catch (error) {
        Logger.error(`'Get ExamResult By Id' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamResultController.createExamResult = async (req, res) => {
    try {
        Logger.info(`'Create ExamResult' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamResultService.createExamResult(req, res);
    } catch (error) {
        Logger.error(`'Create ExamResult' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamResultController.updateExamResult = async (req, res) => {
    try {
        if (!req?.body?._id) {
            Logger.warn(`'Update ExamResult' API Warning: _id is required`, { user_id: req?.user?._id, method: req?.method });
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        Logger.info(`'Update ExamResult' API Called`, { user_id: req?.user?._id, method: req?.method });
        await RankDetailService.updateRankDetail(req, res);
    } catch (error) {
        Logger.error(`'Update ExamResult' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamResultController.deleteExamResult = async (req, res) => {
    try {
        Logger.info(`'Delete ExamResult' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.deleteQuestion(req, res);
    } catch (error) {
        Logger.error(`'Delete ExamResult' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = ExamResultController;