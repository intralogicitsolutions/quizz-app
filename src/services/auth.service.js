const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Users } = require("../models");
const { EncDec } = require("../helper");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

// AuthService.forgotPassword = async (req, res) => {
//     const { email_id } = req.body;

//     const user = await Users.findOne({ email_id });
//     if (!user) {
//         return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);
//     }

//     const resetToken = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     user.reset_token = resetToken;
//     await user.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
//     const emailBody = `Click the following link to reset your password: ${resetLink}`;

//     await sendResetEmail(req, res, email_id, emailBody);

//     return Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.RESET_LINK_SENT);
// }

AuthService.forgotPassword = async (req, res) => {
    try {
        const { email_id } = req.body;

        const user = await Users.findOne({ email_id });
        if (!user) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);
        }

        const resetToken = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        user.reset_token = resetToken;
        user.reset_token_expires = Date.now() + 8 * 60 * 60 * 1000;
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const emailBody = `Click the following link to reset your password: ${resetLink}`;

        await sendResetEmail(req, res, email_id, emailBody); // This handles the response

    } catch (error) {
        console.error("Forgot password error: ", error);
        return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};


AuthService.resetPassword = async (req, res) => {
    const { token, new_password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //const user = await Users.findById(decoded.user_id);
        const user = await Users.findOne({ _id: decoded.user_id, reset_token: token });

        if (!user) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_TOKEN);
        }
        if (user.reset_token_expires && user.reset_token_expires < Date.now()) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.TOKEN_EXPIRED);
        }

        const encryptedPassword = await EncDec.hash_password(new_password);
        user.password = encryptedPassword;
        user.reset_token = null;
        user.reset_token_expires = null;  // Clear the reset token after use
        await user.save();

        return Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.PASSWORD_UPDATED);
    } catch (error) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_TOKEN);
    }
}


const generateAuthToken = async (user) => {
    // Create auth token
    let jwt_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
    return jwt_token;
}

// const sendResetEmail = async (req,res,email, message) => {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com", 
//         port: 587,
//         secure: false,
//         // service: 'gmail', 
//         auth: {
//             user: process.env.EMAIL_USER, 
//             pass: process.env.EMAIL_PASS 
//         }
//     });

//     let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Password Reset Request',
//         text: message
//     };

//     await transporter.sendMail(mailOptions, 
//         (error, info) => {
//         if (error) {
//             return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, "Error sending email.");
//         }
//         Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, { message: "Reset email sent." });
//     }
// );
// }

const sendResetEmail = async (req, res, email, message) => {
    console.log('process.env.SMTP_USERprocess.env.SMTP_USER',process.env.SMTP_USER, process.env.SMTP_PASS)
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        let mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset Request',
            text: message
        };

         transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                console.error("Error sending email:", error); // Log the error
                return res.status(400).json({ status: 400, message: "Error sending email." });
            }
            console.log("Email sent:", info.response);
            res.status(200).json({ status: 200, message: "Email sent successfully!" });
        });

        //Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, { message: "Reset email sent." });
    } catch (error) {
        console.error("Error sending email: ", error);
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, "Error sending email.");
    }
};

module.exports = AuthService;