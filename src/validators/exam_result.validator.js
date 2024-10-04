const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class ExamResultValidation { }

ExamResultValidation.getExamResults = (req, res, next) => {
    const obj = Joi.object({
       user_id: Joi.string().required(),
        exam_id: Joi.string().required(),
        // score: Joi.number().required(),
    });

    return BaseValidation.query(req, res, next, obj);
};

ExamResultValidation.getExamResultById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

ExamResultValidation.createExamResult = (req, res, next) => {
    const obj = Joi.object({
        user_id: Joi.string().required(),
        exam_id: Joi.string().required(),
        score: Joi.number().required(),
        result: Joi.array().items(
            Joi.object({
                question_id: Joi.string().required(),
                user_answer: Joi.string().required()
            })
        ).required()
    });

    return BaseValidation.body(req, res, next, obj);
};

ExamResultValidation.deleteExamResult = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};


module.exports = ExamResultValidation;