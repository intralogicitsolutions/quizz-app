const { AuthService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class AuthController { }

AuthController.signup = async (req, res) => {
    try {
        await AuthService.signup(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

AuthController.signin = async (req, res) => {
    try {
        await AuthService.signin(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = AuthController;