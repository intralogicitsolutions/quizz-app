const CategoryRoute = require('express').Router();
const { CategoryController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { CategoryValidator } = require('../validators')

CategoryRoute.get('/', VerifyToken.validate_token, CategoryController.getCategories);
CategoryRoute.get('/id', VerifyToken.validate_token, CategoryValidator.getCategoryById, CategoryController.getCategoryById);
CategoryRoute.post('/', VerifyToken.validate_token, CategoryValidator.createCategory, CategoryController.createCategory);
CategoryRoute.put('/', VerifyToken.validate_token, CategoryController.updateCategory);
CategoryRoute.delete('/', VerifyToken.validate_token, CategoryValidator.deleteCategory, CategoryController.deleteCategory);

module.exports = CategoryRoute;