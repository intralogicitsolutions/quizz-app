const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Questions } = require("../models");

class QuestionService { }

QuestionService.getQuestions = async (req, res) => {
    const data = await Questions.find(
        {
            language_id: req.query.language_id,
            category_id: req.query.category_id
        }
    );
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

QuestionService.getQuestionById = async (req, res) => {
    const { _id } = req.query;
    const data = await Questions.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

QuestionService.createQuestion = async (req, res) => {
    const data = await Questions.find({ question: req?.body.question });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const question = await new Questions(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, question);
}

QuestionService.updateQuestion = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await Questions.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

QuestionService.deleteQuestion = async (req, res) => {
    const { _id } = req.query;
    await Questions.findOneAndDelete({ _id });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS);
}

module.exports = QuestionService;