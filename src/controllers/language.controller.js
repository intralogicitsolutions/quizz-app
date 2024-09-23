const { LanguageService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Logger } = require("../helper");

class LanguageController { }

LanguageController.getLanguages = async (req, res) => {
    try {
        Logger.info(`'Get Languages' API Called`, { user_id: req?.user?._id, method: req?.method });
        await LanguageService.getLanguages(req, res);
    } catch (error) {
        Logger.error(`'Get Languages' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.getLanguageById = async (req, res) => {
    try {
        Logger.info(`'Get Language By Id' API Called`, { user_id: req?.user?._id, method: req?.method });
        await LanguageService.getLanguageById(req, res);
    } catch (error) {
        Logger.error(`'Get Languages By Id' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.createLanguage = async (req, res) => {
    try {
        Logger.info(`'Create Language' API Called`, { user_id: req?.user?._id, method: req?.method });
        await LanguageService.createLanguage(req, res);
    } catch (error) {
        Logger.error(`'Create Language' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.updateLanguage = async (req, res) => {
    try {
        if (!req?.body?._id) {
            Logger.warn(`'Update Language' API Warning: _id is required`, { user_id: req?.user?._id, method: req?.method });
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }

        Logger.info(`'Update Language' API Called`, { user_id: req?.user?._id, method: req?.method });
        await LanguageService.updateLanguage(req, res);
    } catch (error) {
        Logger.error(`'Update Language' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

LanguageController.deleteLanguage = async (req, res) => {
    try {
        Logger.info(`'Delete Language' API Called`, { user_id: req?.user?._id, method: req?.method });
        await LanguageService.deleteLanguage(req, res);
    } catch (error) {
        Logger.error(`'Delete Language' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = LanguageController;