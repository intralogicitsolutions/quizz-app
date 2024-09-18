const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class CommonValidation { }

CommonValidation.getLanguageById = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

CommonValidation.createLanguage = (req, res, next) => {
    const obj = Joi.object({
        name: Joi.string().required()
    });

    return BaseValidation.body(req, res, next, obj);
};

CommonValidation.deleteLanguage = (req, res, next) => {
    const obj = Joi.object({
        _id: Joi.string().required()
    });

    return BaseValidation.query(req, res, next, obj);
};

module.exports = CommonValidation;