import { jwtDecode } from "jwt-decode";
import { appointments, users } from "../models/modelIndex.js";
import { emailAndPasswordFormatVerification, resultResponse } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
import { encryption } from "../utils/encryption_decryption.js";
import { toObjectID } from "../database/mongoose.js";
const { statusCodes, responseMessages } = constants;
const { errorMessages, userTypes } = responseMessages;


const verifyUserExistance = async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase() || null;
        if (!email)
            return resultResponse(res, statusCodes.badRequest, errorMessages.cannnotProcess, { email });

        if (!emailAndPasswordFormatVerification("email", email))
            return resultResponse(res, statusCodes.badRequest, errorMessages.invalidEmail);

        if (await users.findOne({ email: await encryption(email) }))
            return resultResponse(res, statusCodes.userExists, errorMessages.userExists);

        req.body.email = email;
        next ();
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const decodeIDTokenOfOAuth = (req, res, next) => {
    try {
        const idToken = req.params.idToken || req.body.idToken || req.query.idToken || null;

        if (idToken !== null) {
            const tokenDetails = jwtDecode(idToken);
            if (!tokenDetails.email || !tokenDetails.email.length)
                return resultResponse(res, statusCodes.notFound, errorMessages.emailNotFound);

            if (!tokenDetails.email_verified)
                return resultResponse(res, statusCodes.badRequest, errorMessages.emailNotVerified);
    
            req.body.email = tokenDetails.email.toLowerCase();
            req.body.isAuth = true;
        } else
            req.body.isAuth = false;

        next();
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const passwordValidation = async (req, res, next) => {
    try {
        if (!req.body.isAuth) {
            const { password, confirmPassword } = { ...req.params, ...req.body, ...req.query };
    
            if (!emailAndPasswordFormatVerification("password", password))
                return resultResponse(res, statusCodes.badRequest, errorMessages.passwordValidationError);
    
            if (req.originalUrl === '/signup') {
                if (confirmPassword !== undefined || !!confirmPassword) {
                    if (password !== confirmPassword)
                        return resultResponse(res, statusCodes.badRequest, errorMessages.password_cnf_password_error);
                } else
                    return resultResponse(res, statusCodes.badRequest, errorMessages.confirmPasswordRequired);
            }
        }

        next();
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const verifyUserID = async (req, res, next) => {
    try {
        const { id, userType } = { ...req.user };
    
        let getUser = await users.findOne({ _id: toObjectID(id), userType: userType }).lean();
        if (!getUser)
            return resultResponse(res, statusCodes.notFound, errorMessages.userNotFound);

        req.userDetails = getUser;
        next();
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const verifyAppointmentID = async (req, res, next) => {
    try {
        if (req.user.userType === userTypes[1])
            return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.accessNotFound);

        const appointmentID = req.body.appointmentID || null;

        if (!appointmentID)
            return resultResponse(res, statusCodes.badRequest, errorMessages.idRequired, { appointmentID });

        let appointmentData = await appointments.findOne({ _id: toObjectID(appointmentID) }).lean();
        if (!appointmentData)
            return resultResponse(res, statusCodes.notFound, errorMessages.idNotFound);

        req.appointmentData = appointmentData;
        next();
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { verifyUserExistance, decodeIDTokenOfOAuth, passwordValidation, verifyAppointmentID, verifyUserID };