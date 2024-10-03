const RankDetailRoute = require('express').Router();
const { RankDetailController } = require('../controllers');
const { VerifyToken } = require('../middlewares');
const { RankDetailValidator } = require('../validators');

RankDetailRoute.get('/', VerifyToken.validate_token, RankDetailValidator.getRankDetails, RankDetailController.getRankDetails);
RankDetailRoute.get('/id', VerifyToken.validate_token, RankDetailValidator.getRankDetailById, RankDetailController.getRankDetailById);
RankDetailRoute.post('/', VerifyToken.validate_token, RankDetailValidator.createRankDetail, RankDetailController.createRankDetail);
RankDetailRoute.put('/', VerifyToken.validate_token, RankDetailController.updateRankDetail);

module.exports = RankDetailRoute;