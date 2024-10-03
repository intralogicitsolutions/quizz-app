const ScoreDetailRoute = require('express').Router();
const { ScoreDetailController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { ScoreDetailValidator } = require('../validators');

ScoreDetailRoute.get('/', VerifyToken.validate_token, ScoreDetailValidator.getScoreDetails, ScoreDetailController.getScoreDetails);
ScoreDetailRoute.get('/id', VerifyToken.validate_token, ScoreDetailValidator.getScoreDetailById, ScoreDetailController.getScoreDetailById);
ScoreDetailRoute.post('/', VerifyToken.validate_token, ScoreDetailValidator.createScoreDetail, ScoreDetailController.createScoreDetail);
ScoreDetailRoute.put('/', VerifyToken.validate_token, ScoreDetailController.updateScoreDetail);

module.exports = ScoreDetailRoute;