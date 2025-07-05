import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import constants from "./constants.json" assert { type: "json" };
const { successMessages, errorMessages } = constants.responseMessages;
const { MAILSERVICE, SENDERMAIL, SENDERNODEMAILERPASSWORD } = process.env;


export const sendMail = async (data) => {
    try {
        const { userMail, subject, html } = data;
        const mailTransporter = nodeMailer.createTransport({
            service: MAILSERVICE,
            auth: { user: SENDERMAIL, pass: SENDERNODEMAILERPASSWORD } 
        });

        const mailDetails = {
            from: SENDERMAIL,
            to: userMail,
            subject: subject,
            html: html
        };

        mailTransporter.sendMail(mailDetails, (err, response) => {
            if (err) {
                console.log("Error in mail sending >>", err)
                return err;
            }
            console.log(">>>>>>>>>>>", response);
            return true;
        });
    } catch (error) {
        console.log(errorMessages.internalError, error)
        return error;
    }
};