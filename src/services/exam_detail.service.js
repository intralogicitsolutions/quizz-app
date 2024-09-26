const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { ExamDetails } = require("../models");

class ExamDetailService { }

ExamDetailService.getExamDetails = async (req, res) => {
    let { language_id, category_id, difficulty } = req.query;
    // limit = limit ? parseInt(limit) : 10;
    const response = await ExamDetails.find({ language_id, category_id, difficulty });
    // const data = await ExamDetails.find();
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, response);
}

ExamDetailService.getExamDetailById = async (req, res) => {
    const { _id } = req.query;
    const data = await ExamDetails.findOne({ _id });
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

ExamDetailService.createExamDetail = async (req, res) => {
    console.log(req);
    const data = await ExamDetails.find({ exam_name: req?.body?.exam_name ,
         language_id: req?.body?.language_id, 
         category_id: req?.body?.category_id,
         difficulty: req?.body?.difficulty
        });

    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.ALREADY_EXISTS);
    }

    const examDetail = await new ExamDetails(req.body).save();

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, examDetail);
}

ExamDetailService.updateExamDetail = async (req, res) => {
    const { _id, ...body } = req.body;
    const data = await ExamDetails.findOneAndUpdate({ _id }, body, { new: true });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, data);
}

ExamDetailService.deleteExamDetail = async (req, res) => {
    const { _id } = req.query;
    await ExamDetails.findOneAndDelete({ _id });

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS);
}

module.exports = ExamDetailService;