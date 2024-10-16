const AuthRoute = require('express').Router();
const { AuthController} = require('../controllers');
const { AuthValidator } = require('../validators')
const { VerifyToken } = require('../middlewares');


AuthRoute.post('/signup', AuthValidator.signup, AuthController.signup,);
AuthRoute.post('/signin', AuthValidator.signin, AuthController.signin);

AuthRoute.post('/forgotPassword', AuthValidator.forgotPassword, AuthController.forgotPassword);
AuthRoute.post('/resetPassword', AuthValidator.resetPassword, AuthController.resetPassword);

AuthRoute.post('/reset_password', AuthValidator.reset_password, AuthController.reset_password);

AuthRoute.patch('/profile/:id', VerifyToken.validate_token,AuthValidator.editUserProfile, AuthController.editUserProfile);
AuthRoute.get('/profile/', VerifyToken.validate_token,AuthValidator.getUserProfile, AuthController.getUserProfile);

AuthRoute.post('/logout', VerifyToken.validate_token, AuthController.logout);

module.exports = AuthRoute;