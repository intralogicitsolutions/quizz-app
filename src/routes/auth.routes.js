const AuthRoute = require('express').Router();
const { AuthController } = require('../controllers');
const { AuthValidator } = require('../validators')

AuthRoute.post('/signup', AuthValidator.signup, AuthController.signup);
AuthRoute.post('/signin', AuthValidator.signin, AuthController.signin);

module.exports = AuthRoute;