const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Users } = require("../models");
const { EncDec } = require("../helper");
const jwt = require('jsonwebtoken');

class AuthService { }

AuthService.signup = async (req, res) => {
    const body = req.body;
    const { email_id, password } = body;
    const data = await Users.find({ email_id });
    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.USER_ALREADY_EXISTS);
    }

    const encryptedPassword = await EncDec.hash_password(password);
    body['password'] = encryptedPassword;
    const user = await new Users(body).save();
    delete user._doc.password;
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, user);
}

AuthService.signin = async (req, res) => {
    const { email_id, password } = req.body;
    let user = await Users.findOne({ email_id });
    user = user._doc;
    let isMatch = await EncDec.compare_passwords(password, user.password);
    if (!isMatch) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INCORRECT_PASSWORD);
    }

    delete user.password;
    const jwt_token = await generateAuthToken(user);
    user['access_token'] = jwt_token;
    console.log(user['access_token']);

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, user);
}

const generateAuthToken = async (user) => {
    // Create auth token
    let jwt_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
    return jwt_token;
}

module.exports = AuthService;