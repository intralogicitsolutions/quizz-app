const { AuthService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

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

module.exports = AuthController;