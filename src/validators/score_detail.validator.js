const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class ScoreDetailValidation { }

ScoreDetailValidation.getScoreDetails = (req, res, next) => {
    const obj = Joi.object({
       user_id: Joi.string().required(),
        exam_id: Joi.string().required(),
    });

    return BaseValidation.query(req, res, next, obj);
};

ScoreDetailValidation.getScoreDetailById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

ScoreDetailValidation.createScoreDetail = (req, res, next) => {
    const obj = Joi.object({
        user_id: Joi.string().required(),
        exam_id: Joi.string().required(),
        score: Joi.number().required(),
    });

    return BaseValidation.body(req, res, next, obj);
};



module.exports = ScoreDetailValidation;