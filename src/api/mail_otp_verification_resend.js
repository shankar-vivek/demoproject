import { users } from "../models/modelIndex.js";
import { generateNdigitsNumber, resultResponse } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
import { decryption } from "../utils/encryption_decryption.js";
import { sendMail } from "../utils/mailService.js";
const { statusCodes, responseMessages } = constants;
const { successMessages, errorMessages } = constants.responseMessages;


const verifyMailOTP = async (req, res) => {
    try {
        const pincode = req.params.pincode || req.query.pincode || req.body.pincode ||  null;
        const { _id, isOTP_verified, userOTP } = req.userDetails;

        if (isOTP_verified)
            return resultResponse(res, statusCodes.badRequest, errorMessages.userMailAlreadyVerified);

        if (!pincode || pincode.length < 4 || pincode.length > 4)
            return resultResponse(res, statusCodes.badRequest, errorMessages.invalidPincode);

        if (Number(pincode) !== userOTP)
            return resultResponse(res, statusCodes.badRequest, errorMessages.otpWrong, { pincode });

        await users.updateOne({ _id }, { isOTP_verified: 1 });

        return resultResponse(res, statusCodes.success, successMessages.OTP_verified);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const resendMailOTP = async (req, res) => {
    try {
        const { email, _id, userOTP } = req.userDetails;

        if (!userOTP)
            await sendMail({ userMail: await decryption(insertUserData.email), 
                subject: "Verification mail from sample project..",
                html: `<p>Your verification otp is ${insertData.userOTP}.</p>`
            });

        req.code = generateNdigitsNumber(4);
        await users.updateOne({ _id }, { userOTP: req.code, isOTP_verified: false });

        await sendMail({ userMail: await decryption(email), 
            subject: "Re-send OTP mail from sample project..",
            html: `<p>Your re-send otp is ${req.code}.</p>`
        });

        return resultResponse(res, statusCodes.success, errorMessages.otpSent);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { verifyMailOTP, resendMailOTP };