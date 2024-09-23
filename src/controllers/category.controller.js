const { CategoryService } = require("../services");
const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");

class CategoryController { }

CategoryController.getCategories = async (req, res) => {
    try {
        Logger.info(`'Get Categories' API Called`, { user_id: req?.user?._id, method: req?.method });
        await CategoryService.getCategories(req, res);
    } catch (error) {
        Logger.error(`'Get Categories' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.getCategoryById = async (req, res) => {
    try {
        Logger.info(`'Get Category By ID' API Called`, { user_id: req?.user?._id, method: req?.method });
        await CategoryService.getCategoryById(req, res);
    } catch (error) {
        Logger.error(`'Get Category By ID' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.createCategory = async (req, res) => {
    try {
        Logger.info(`'Create Category' API Called`, { user_id: req?.user?._id, method: req?.method });
        await CategoryService.createCategory(req, res);
    } catch (error) {
        Logger.error(`'Create Category' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.updateCategory = async (req, res) => {
    try {
        if (!req?.body?._id) {
            Logger.warn(`'Update Category' API Warning: _id is required`, { user_id: req?.user?._id, method: req?.method });
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, '_id is required');
        }

        Logger.info(`'Update Category' API Called`, { user_id: req?.user?._id, method: req?.method });
        await CategoryService.updateCategory(req, res);
    } catch (error) {
        Logger.error(`'Update Category' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

CategoryController.deleteCategory = async (req, res) => {
    try {
        Logger.info(`'Delete Category' API Called`, { user_id: req?.user?._id, method: req?.method });
        await CategoryService.deleteCategory(req, res);
    } catch (error) {
        Logger.error(`'Delete Category' API Error: ${error.message}`, { user_id: req?.user?._id, method: req?.method });
        Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.TRY_AGAIN_LATER);
    }
}

module.exports = CategoryController;