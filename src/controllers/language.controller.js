const { LanguageService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class LanguageController { }

LanguageController.getLanguages = async (req, res) => {
    try {
        await LanguageService.getLanguages(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.getLanguageById = async (req, res) => {
    try {
        await LanguageService.getLanguageById(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.createLanguage = async (req, res) => {
    try {
        await LanguageService.createLanguage(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.updateLanguage = async (req, res) => {
    try {
        if(!req?.body?._id) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        await LanguageService.updateLanguage(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.deleteLanguage = async (req, res) => {
    try {
        await LanguageService.deleteLanguage(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = LanguageController;