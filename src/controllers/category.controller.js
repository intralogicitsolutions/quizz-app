const { CategoryService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class CategoryController { }

CategoryController.getCategories = async (req, res) => {
    try {
        await CategoryService.getCategories(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.getCategoryById = async (req, res) => {
    try {
        await CategoryService.getCategoryById(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.createCategory = async (req, res) => {
    try {
        await CategoryService.createCategory(req, res);
    } catch (error) {
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.updateCategory = async (req, res) => {
    try {
        if (!req?.body?._id) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }
        await CategoryService.updateCategory(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.deleteCategory = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req, res);
    } catch (error) {
        console.error(error)
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = CategoryController;