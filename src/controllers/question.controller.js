const { QuestionService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class QuestionController { }

QuestionController.getQuestions = async (req, res) => {
    try {
        await QuestionService.getQuestions(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.getQuestionById = async (req, res) => {
    try {
        await QuestionService.getQuestionById(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.createQuestion = async (req, res) => {
    try {
        await QuestionService.createQuestion(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.updateQuestion = async (req, res) => {
    try {
        if (!req?.body?._id) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        await QuestionService.updateQuestion(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

QuestionController.deleteQuestion = async (req, res) => {
    try {
        await QuestionService.deleteQuestion(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = QuestionController;