const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class AuthValidation { }

AuthValidation.signup = (req, res, next) => {
    const obj = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email_id: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return BaseValidation.body(req, res, next, obj);
};

AuthValidation.signin = (req, res, next) => {
    const obj = Joi.object({
        email_id: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return BaseValidation.body(req, res, next, obj);
};

module.exports = AuthValidation;