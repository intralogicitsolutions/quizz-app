const ExamResultRoute = require('express').Router();
const { ExamResultController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { ExamResultValidator } = require('../validators');

ExamResultRoute.get('/', VerifyToken.validate_token, ExamResultValidator.getExamResults, ExamResultController.getExamResults);
ExamResultRoute.get('/id', VerifyToken.validate_token, ExamResultValidator.getExamResultById, ExamResultController.getExamResultById);
ExamResultRoute.post('/', VerifyToken.validate_token, ExamResultValidator.createExamResult, ExamResultController.createExamResult);
ExamResultRoute.put('/', VerifyToken.validate_token, ExamResultController.updateExamResult);
ExamResultRoute.delete('/', VerifyToken.validate_token, ExamResultValidator.deleteExamResult, ExamResultController.deleteExamResult);

module.exports = ExamResultRoute;