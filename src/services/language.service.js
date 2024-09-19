const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Languages } = require("../models");

class LanguageService { }

LanguageService.getLanguages = async (req, res) => {
    const data = await Languages.find();
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

LanguageService.getLanguageById = async (req, res) => {
    const { _id } = req.query;
    const data = await Languages.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

LanguageService.createLanguage = async (req, res) => {
    const data = await Languages.find({ name: req?.name });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const language = await new Languages(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, language);
}

LanguageService.updateLanguage = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await Languages.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

LanguageService.deleteLanguage = async (req, res) => {
    const { _id } = req.query;
    await Languages.findOneAndDelete({ _id });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS);
}

module.exports = LanguageService;