const { CommonService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class CommonController { }

CommonController.getLanguages = async (req, res) => {
    try {
        await CommonService.getLanguages(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CommonController.getLanguageById = async (req, res) => {
    try {
        await CommonService.getLanguageById(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CommonController.createLanguage = async (req, res) => {
    try {
        await CommonService.createLanguage(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CommonController.updateLanguage = async (req, res) => {
    try {
        if(!req?.body?._id) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        await CommonService.updateLanguage(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CommonController.deleteLanguage = async (req, res) => {
    try {
        await CommonService.deleteLanguage(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = CommonController;