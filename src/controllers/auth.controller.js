const { AuthService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class AuthController { }

AuthController.signup = async (req, res) => {
    try {
        Logger.info(`'Signup' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.signup(req, res);
    } catch (error) {
        Logger.error(`'Signup' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.signin = async (req, res) => {
    try {
        Logger.info(`'Signin' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.signin(req, res);
    } catch (error) {
        Logger.error(`'Signin' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.forgotPassword = async (req, res) => {
    try {
        Logger.info(`'Forgot Password' API Called`, { email: req?.user?._id, method: req?.method });
        await AuthService.forgotPassword(req, res);
    } catch (error) {
        Logger.error(`'Forgot Password' API Error: ${error.message}`, { email: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.resetPassword = async (req, res) => {
    try {
        Logger.info(`'Reset Password' API Called`, { token: req.body?.token, method: req?.method });
        await AuthService.resetPassword(req, res);
    } catch (error) {
        Logger.error(`'Reset Password' API Error: ${error.message}`, { token: req.body?.token, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
    
}

AuthController.reset_password = async (req, res) => {
    try {
        Logger.info(`'Reset password' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.reset_password(req, res);
    } catch (error) {
        Logger.error(`'Reset password' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
    
 }


AuthController.editUserProfile = async (req, res) => {
    try {
        Logger.info(`'Update EditUserProfile' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.editUserProfile(req, res);
    } catch (error) {
        Logger.error(`'Update EditUserProfile' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.getUserProfile = async (req, res) => {
    try {
        Logger.info(`'Get EditUserProfile' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.getUserProfile(req, res);
    } catch (error) {
        Logger.error(`'Get EditUserProfile' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.logout = async (req, res) => {
    try {
        Logger.info(`'Logout' API Called`, { user_id: req?.user?._id, method: req?.method });
        await AuthService.logout(req, res);
    } catch (error) {
        Logger.error(`'Logout' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}


module.exports = AuthController;