const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class QuestionValidation { }

QuestionValidation.getQuestions = (req, res, next) => {
    const obj = Joi.object({
        question_id: Joi.string().required(),
        // category_id: Joi.string().required(),
        // difficulty: Joi.string().required(),
        // limit: Joi.number()
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
        options: Joi.array().required(),
        correct_answer: Joi.number().required(),
        question_id: Joi.string().required(),
        // category_id: Joi.string().required(),
        // difficulty: Joi.string().required(),
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