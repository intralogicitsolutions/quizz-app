const { ExamDetailService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class ExamDetailController { }

ExamDetailController.getExamDetails = async (req, res) => {
    try {
        Logger.info(`'Get ExamDetails' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamDetailService.getExamDetails(req, res);
    } catch (error) {
        Logger.error(`'Get ExamDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamDetailController.getExamDetailById = async (req, res) => {
    try {
        Logger.info(`'Get ExamDetails By Id' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamDetailService.getExamDetailById(req, res);
    } catch (error) {
        Logger.error(`'Get ExamDetail By Id' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamDetailController.createExamDetail = async (req, res) => {
    try {
        Logger.info(`'Create ExamDetail' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamDetailService.createExamDetail(req, res);
    } catch (error) {
        Logger.error(`'Create ExamDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamDetailController.updateExamDetail = async (req, res) => {
    try {
        if (!req?.body?._id) {
            Logger.warn(`'Update ExamDetail' API Warning: _id is required`, { user_id: req?.user?._id, method: req?.method });
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        Logger.info(`'Update ExamDetail' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamDetailService.updateExamDetail(req, res);
    } catch (error) {
        Logger.error(`'Update ExamDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

ExamDetailController.deleteExamDetail = async (req, res) => {
    try {
        Logger.info(`'Delete ExamDetail' API Called`, { user_id: req?.user?._id, method: req?.method });
        await ExamDetailService.deleteExamDetail(req, res);
    } catch (error) {
        Logger.error(`'Delete ExamDetail' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = ExamDetailController;