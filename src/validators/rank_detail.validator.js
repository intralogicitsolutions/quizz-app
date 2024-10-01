const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class RankDetailValidation { }

RankDetailValidation.getRankDetails = (req, res, next) => {
    const obj = Joi.object({
        score_id: Joi.string().required(),
        exam_id: Joi.string().required(),
    });

    return BaseValidation.query(req, res, next, obj);
};

RankDetailValidation.getRankDetailById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

RankDetailValidation.createRankDetail = (req, res, next) => {
    const obj = Joi.object({
        exam_id: Joi.string().required(),
        score: Joi.number().required(),
        score_id: Joi.string().required()
    });

    return BaseValidation.body(req, res, next, obj);
};



module.exports = RankDetailValidation;