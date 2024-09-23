const { QuestionService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class QuestionController { }

QuestionController.getQuestions = async (req, res) => {
    try {
        Logger.info(`'Get Questions' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.getQuestions(req, res);
    } catch (error) {
        Logger.error(`'Get Question' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.getQuestionById = async (req, res) => {
    try {
        Logger.info(`'Get Questions By Id' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.getQuestionById(req, res);
    } catch (error) {
        Logger.error(`'Get Question By Id' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.createQuestion = async (req, res) => {
    try {
        Logger.info(`'Create Question' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.createQuestion(req, res);
    } catch (error) {
        Logger.error(`'Create Question' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.updateQuestion = async (req, res) => {
    try {
        if (!req?.body?._id) {
            Logger.warn(`'Update Question' API Warning: _id is required`, { user_id: req?.user?._id, method: req?.method });
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        Logger.info(`'Update Question' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.updateQuestion(req, res);
    } catch (error) {
        Logger.error(`'Update Question' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.deleteQuestion = async (req, res) => {
    try {
        Logger.info(`'Delete Question' API Called`, { user_id: req?.user?._id, method: req?.method });
        await QuestionService.deleteQuestion(req, res);
    } catch (error) {
        Logger.error(`'Delete Question' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = QuestionController;