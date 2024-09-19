const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Categories } = require("../models");

class CategoryService { }

CategoryService.getCategories = async (req, res) => {
    const data = await Categories.find();
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

CategoryService.getCategoryById = async (req, res) => {
    const { _id } = req.query;
    const data = await Categories.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

CategoryService.createCategory = async (req, res) => {
    const data = await Categories.find({ name: req?.name });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const category = await new Categories(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, category);
}

CategoryService.updateCategory = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await Categories.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

CategoryService.deleteCategory = async (req, res) => {
    const { _id } = req.query;
    await Categories.findOneAndDelete({ _id });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS);
}

module.exports = CategoryService;