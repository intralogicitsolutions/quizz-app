const QuestionRoute = require('express').Router();
const { QuestionController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { QuestionValidator } = require('../validators');

QuestionRoute.get('/', VerifyToken.validate_token, QuestionValidator.getQuestions, QuestionController.getQuestions);
QuestionRoute.get('/id', VerifyToken.validate_token, QuestionValidator.getQuestionById, QuestionController.getQuestionById);
QuestionRoute.post('/', VerifyToken.validate_token, QuestionValidator.createQuestion, QuestionController.createQuestion);
QuestionRoute.put('/', VerifyToken.validate_token, QuestionController.updateQuestion);
QuestionRoute.delete('/', VerifyToken.validate_token, QuestionValidator.deleteQuestion, QuestionController.deleteQuestion);

module.exports = QuestionRoute;