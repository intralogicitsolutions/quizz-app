const CommonRoute = require('express').Router();
const { CommonController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { CommonValidator } = require('../validators')

CommonRoute.get('/language', VerifyToken.validate_token, CommonController.getLanguages);
CommonRoute.get('/language_by_id', VerifyToken.validate_token, CommonValidator.getLanguageById, CommonController.getLanguageById);
CommonRoute.post('/language', VerifyToken.validate_token, CommonValidator.createLanguage, CommonController.createLanguage);
CommonRoute.put('/language', VerifyToken.validate_token, CommonController.updateLanguage);
CommonRoute.delete('/language', VerifyToken.validate_token, CommonValidator.deleteLanguage, CommonController.deleteLanguage);

module.exports = CommonRoute;