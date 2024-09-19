const LanguageRoute = require('express').Router();
const { LanguageController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { LanguageValidator } = require('../validators')

LanguageRoute.get('/', VerifyToken.validate_token, LanguageController.getLanguages);
LanguageRoute.get('/id', VerifyToken.validate_token, LanguageValidator.getLanguageById, LanguageController.getLanguageById);
LanguageRoute.post('/', VerifyToken.validate_token, LanguageValidator.createLanguage, LanguageController.createLanguage);
LanguageRoute.put('/', VerifyToken.validate_token, LanguageController.updateLanguage);
LanguageRoute.delete('/', VerifyToken.validate_token, LanguageValidator.deleteLanguage, LanguageController.deleteLanguage);

module.exports = LanguageRoute;