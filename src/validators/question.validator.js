const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class QuestionValidation { }

QuestionValidation.getQuestions = (req, res, next) => {
    const obj = Joi.object({
        language_id: Joi.string().required(),
        category_id: Joi.string().required(),
        difficulty: Joi.string().required(),
    });

    return BaseValidation.query(req, res, next, obj);
};

QuestionValidation.getQuestionById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

QuestionValidation.createQuestion = (req, res, next) => {
    const obj = Joi.object({
        question: Joi.string().required(),
        answers: Joi.array().required(),
        correctAnswer: Joi.number().required(),
        language_id: Joi.string().required(),
        category_id: Joi.string().required(),
        difficulty: Joi.string().required(),
    });

    return BaseValidation.body(req, res, next, obj);
};

QuestionValidation.deleteQuestion = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

module.exports = QuestionValidation;