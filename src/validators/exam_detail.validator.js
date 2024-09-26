const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class ExamDetailValidation { }

ExamDetailValidation.getExamDetails = (req, res, next) => {
    const obj = Joi.object({
        language_id: Joi.string().required(),
        category_id: Joi.string().required(),
        difficulty: Joi.string().required(),
        // limit: Joi.number()
    });

    return BaseValidation.query(req, res, next, obj);
};

ExamDetailValidation.getExamDetailById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

ExamDetailValidation.createExamDetail = (req, res, next) => {
    const obj = Joi.object({
        exam_name: Joi.string().required(),
        language_id: Joi.string().required(),
        category_id: Joi.string().required(),
        difficulty: Joi.string().required(),
    });

    return BaseValidation.body(req, res, next, obj);
};

ExamDetailValidation.deleteExamDetail = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

module.exports = ExamDetailValidation;