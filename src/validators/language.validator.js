const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class LanguageValidation { }

LanguageValidation.getLanguageById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

LanguageValidation.createLanguage = (req, res, next) => {
    const obj = Joi.object({
        name: Joi.string().required(),
        icon: Joi.string()
    });

    return BaseValidation.body(req, res, next, obj);
};

LanguageValidation.deleteLanguage = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

module.exports = LanguageValidation;