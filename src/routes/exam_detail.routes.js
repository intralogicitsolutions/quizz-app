const ExamDetailRoute = require('express').Router();
const { ExamDetailController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { ExamDetailValidator } = require('../validators');

ExamDetailRoute.get('/', VerifyToken.validate_token, ExamDetailValidator.getExamDetails, ExamDetailController.getExamDetails);
ExamDetailRoute.get('/id', VerifyToken.validate_token, ExamDetailValidator.getExamDetailById, ExamDetailController.getExamDetailById);
ExamDetailRoute.post('/', VerifyToken.validate_token, ExamDetailValidator.createExamDetail, ExamDetailController.createExamDetail);
ExamDetailRoute.put('/', VerifyToken.validate_token, ExamDetailController.updateExamDetail);
ExamDetailRoute.delete('/', VerifyToken.validate_token, ExamDetailValidator.deleteExamDetail, ExamDetailController.deleteExamDetail);

module.exports = ExamDetailRoute;