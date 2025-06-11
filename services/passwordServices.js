const SibApiV3Sdk = require('sib-api-v3-sdk');
const User = require('../models/user');
const ForgetPassword = require('../models/forgetpassword');
const bcrypt = require('bcrypt');

const forgotpassword = async (email) => {
    if (!email) {
        throw new Error('Email is required');
    }

    const founduser = await User.findOne({ email });
    if (!founduser) {
        throw new Error('User not found');
    }

    const resetRequest = await ForgetPassword.create({
        isactive: true,
        user: founduser._id,
    });

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = { email: process.env.EMAIL_SENDER, name: 'Vikram Kumar' };
    const receivers = [{ email: email }];

    const sendSmtpEmail = {
        sender,
        to: receivers,
        subject: 'Recover Your Password',
        htmlContent: `
            <p>Hello,</p>
            <p>We received a request to reset your password.</p>
            <a href="http://localhost:3000/password/resetpassword/${resetRequest._id}">Reset password</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
};

const resetpassword = async (id) => {
    const reset = await ForgetPassword.findOne({ _id: id, isactive: true });
    if (!reset) {
        throw new Error('Invalid or expired reset link');
    }
    return reset;
};

const updatepassword = async (id, newpassword) => {
    const resetRequest = await ForgetPassword.findOne({ _id: id });
    if (!resetRequest || !resetRequest.isactive) {
        throw new Error('Cannot update password. Reset link is invalid');
    }

    const saltround = 10;
    const hash = await bcrypt.hash(newpassword, saltround);

    const founduser = await User.findOne({ _id: resetRequest.user });
    founduser.password = hash;
    await founduser.save();

    resetRequest.isactive = false;
    await resetRequest.save();

    return 'Password changed successfully';
};

module.exports = { forgotpassword, resetpassword, updatepassword };