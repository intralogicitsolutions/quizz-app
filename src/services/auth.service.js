const { Response } = require("../middlewares");
const { StatusCodes, ResponseMessage } = require("../constants");
const { Users } = require("../models");
const { BlacklistedToken  } = require('../models');
const { EncDec } = require("../helper");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require('uuid');

class AuthService { }

AuthService.signup = async (req, res) => {
    const body = req.body;
    const { email_id, password, } = body;

    // if (req.file) {
    //     body.image_path = req.file.path; // Save the image path
    // }
    // const imagePath = req.file ? req.file.path : null;

    const data = await Users.find({ email_id });
    if (data && data?.length) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.USER_ALREADY_EXISTS);
    }

    const encryptedPassword = await EncDec.hash_password(password);
    body['password'] = encryptedPassword;

    if (req.file) {
        body['image_path'] = req.file.path; // Use the path from multer
    }

    // if (imagePath) {
    //     body['image_path'] = imagePath;
    // }

    // body['user_id'] = uuidv4(); 

    const user = await new Users(body).save();
    delete user._doc.password;
    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, user);
}

AuthService.signin = async (req, res) => {
    const { email_id, password } = req.body;
    let user = await Users.findOne({ email_id });
    console.log("user :: ", user);
    user = user._doc;
    let isMatch = await EncDec.compare_passwords(password, user.password);
    if (!isMatch) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INCORRECT_PASSWORD);
    }

    delete user.password;
    const jwt_token = await generateAuthToken(user);
    console.log("jwt_token :", jwt_token);
    user['access_token'] = jwt_token;
    console.log(user['access_token']);

    Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, user);
}


AuthService.forgotPassword = async (req, res) => {
    try {
        const { email_id } = req.body;

        const user = await Users.findOne({ email_id });
        if (!user) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);
        }

        // const resetToken = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        // user.reset_token = resetToken;
        // user.reset_token_expires = Date.now() + 8 * 60 * 60 * 1000;
        // await user.save();

        // const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        user.otp_expires = Date.now() + 10 * 60 * 1000;
        await user.save();
        //return otp.toString(); // Convert the number to a string
        //const emailBody = `Click the following link to reset your password: ${otp.toString()}`;
        const emailBody = `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`;
        await sendResetEmail(req, res, email_id, emailBody); 

    } catch (error) {
        console.error("Forgot password error: ", error);
        return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}


AuthService.resetPassword = async (req, res) => {
    //const { token, new_password } = req.body;
    const { otp, new_password, email_id } = req.body;

    try {
        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await Users.findOne({ _id: decoded.user_id, reset_token: token });
        // if (!user) {
        //     return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_TOKEN);
        // }
        // if (user.reset_token_expires && user.reset_token_expires < Date.now()) {
        //     return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.TOKEN_EXPIRED);
        // }

        const user = await Users.findOne({ email_id, otp });

        if (!user) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_OTP);
        }

        // Check if OTP is expired
        if (user.otp_expires && user.otp_expires < Date.now()) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.OTP_EXPIRED);
        }

        const encryptedPassword = await EncDec.hash_password(new_password);
        user.password = encryptedPassword;
        // user.reset_token = null;
        // user.reset_token_expires = null;  
        user.otp = null;
        user.otp_expires = null;
        await user.save();

        return Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.PASSWORD_UPDATED);
    } catch (error) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_OTP);
    }
}

AuthService.reset_password = async (req, res) => {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
        return res.status(400).json({success: false, message: 'Email and new password are required' });
      }

      try {
        console.log('Request User:', req.user);
        //Find user by their unique ID
        const user = await Users.findById(req.user._id);
        if (!user) {
          return res.status(404).json({success: false, message: 'User not found' });
        }

        // Compare current password with the user's stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }
    
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
       // user.user_id = user._id;
    
        // Save the user with the new password
        await user.save();
    
        return res.status(200).json({ message: 'Password reset successfully' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
}

const generateAuthToken = async (user) => {

    let jwt_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
    return jwt_token;
}

const sendResetEmail = async (req, res, email, message, resetToken) => {
    console.log('SMTP Credentials:',process.env.SMTP_USER, process.env.SMTP_PASS)
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
            res.status(200).json({resetToken, status: 200, message: "OTP sent successfully!" });
        });

        
    } catch (error) {
        console.error("Error sending email: ", error);
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, "Error sending email.");
    }
}


AuthService.editUserProfile = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.INVALID_OBJECT_ID);
        }
        
        const objectId = ObjectId.createFromHexString(id);

        const existingUser = await Users.findById(objectId).exec();
        if (!existingUser) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);
        }

        const updatedUser = await Users.findByIdAndUpdate(objectId, updates, { new: true, runValidators: true });

        Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS, updatedUser);

    } catch (error) {
        console.error(error);
        Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.UPDATE_FAILED);
    }
}


AuthService.getUserProfile = async(req, res) => {
    try {
        let { user_id } = req.query;
        user_id = ObjectId.createFromHexString(user_id);

        const user = await Users.findById(user_id);
    
        if (!user) {
            return Response.errors(req, res, StatusCodes.HTTP_NOT_FOUND, ResponseMessage.USER_NOT_FOUND);
        }
    
        return Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.SUCCESS,{
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_id: user.email_id,
            password: user.password,
            image_path: user.image_path,
            reset_token: user.reset_token,
            reset_token_expires: user.reset_token_expires,
          
        });
      } catch (error) {
        return Response.errors(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, ResponseMessage.SERVER_ERROR, error.message);
      }
}

AuthService.logout = async (req, res) => {
    const  token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return Response.errors(req, res, StatusCodes.HTTP_BAD_REQUEST, ResponseMessage.TOKEN_MISSING);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const expiration = new Date(decoded.exp * 1000);
        const blacklistedToken = new BlacklistedToken({
            token,expiration
        });
        await blacklistedToken.save();

        Response.success(req, res, StatusCodes.HTTP_OK, ResponseMessage.LOGOUT_SUCCESS);
    } catch (error) {
        return Response.errors(req, res, StatusCodes.HTTP_UNAUTHORIZED, ResponseMessage.INVALID_TOKEN);
    }

}

module.exports = AuthService;