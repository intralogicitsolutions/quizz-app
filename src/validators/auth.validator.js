const Joi = require("joi");
const BaseValidation = require("../middlewares/base_validation");

class AuthValidation { }

AuthValidation.signup = (req, res, next) => {
    const obj = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email_id: Joi.string().email().required(),
        password: Joi.string().required(),
       image_path: Joi.string().optional()
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

AuthValidation.forgotPassword = (req, res, next) => {
    const obj = Joi.object({
        email_id: Joi.string().email().required(), 
    });

    return BaseValidation.body(req, res, next, obj);
};

AuthValidation.resetPassword = (req, res, next) => {
    const obj = Joi.object({
        token: Joi.string().required(), 
        new_password: Joi.string().required(), 
    });

    return BaseValidation.body(req, res, next, obj);
};

AuthValidation.reset_password = (req, res, next) => {
    const obj = Joi.object({
        email_id: Joi.string().email().required(), 
        newPassword: Joi.string().required(), 
    });

    return BaseValidation.body(req, res, next, obj);
};


AuthValidation.editUserProfile = (req, res, next) =>{
    const obj = Joi.object({
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        email_id: Joi.string().email().optional(),
        password: Joi.string().optional(),
        image_path: Joi.string().optional(),
    });

    return BaseValidation.body(req, res, next, obj);
}

AuthValidation.getUserProfile = (req, res, next) => {
    const obj = Joi.object({
       user_id: Joi.string().required(),
    });

    return BaseValidation.query(req, res, next, obj);
};



module.exports = AuthValidation;