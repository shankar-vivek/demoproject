import { generateNdigitsNumber, passwordHashing, passwordVerification, resultResponse } from "../utils/commonFunctions.js";
import { decryption, encryption } from "../utils/encryption_decryption.js";
import constants from "../utils/constants.json" assert { type: "json" };
import { sessions, users } from "../models/modelIndex.js";
import { makeSession } from "../utils/sessionValidations.js";
import { toObjectID } from "../database/mongoose.js";
import { sendMail } from "../utils/mailService.js";
const { statusCodes, responseMessages } = constants;
const { successMessages, errorMessages } = responseMessages;


const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = !req.body.isAuth ? passwordHashing(password) : null;

        const insertData = {
            email: await encryption(email),
            password: hashedPassword,
            is_oauth: req.body.isAuth ? true : false,
            userOTP: generateNdigitsNumber(4)
        };

        let insertUserData = await users.create(insertData);

        const responseData = await makeSession(insertUserData, 'test12345', "IOS");
        if (responseData === errorMessages.dbError)
            return resultResponse(res, statusCodes.internalError, errorMessages.dbError);

        return resultResponse(res, statusCodes.success, successMessages.signup, responseData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const signIn = async (req, res) => {
    try {
      let { email, password, deviceID = 'test123', deviceType = "IOS", userType } = req.body;

        if (!req.body.isAuth) {
            if (!email || !password)
                return resultResponse(res, statusCodes.badRequest, errorMessages.cannnotProcess);
        }

        email = email.toLowerCase();

        let insertData = { email: await encryption(email) };

        let getUserDetails = await users.findOne(insertData).lean();
        if (!getUserDetails)
            return resultResponse(res, statusCodes.notFound, errorMessages.userNotFound);

        if (req.body.isAuth !== getUserDetails.is_oauth)
            return resultResponse(res, statusCodes.badRequest, errorMessages.invalidLoginProcess);

        if (!req.body.isAuth) {
            let validatePassword = passwordVerification(password, getUserDetails.password);
            if (!validatePassword)
                return resultResponse(res, statusCodes.badRequest, errorMessages.incorrectPassword);

            if (validatePassword.message === errorMessages.data_and_hash_arguments_required)
                return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.unauthorizedUser, { validatePassword });
        }

        req.code = generateNdigitsNumber(4);
        await users.updateOne({ _id: getUserDetails._id }, { userOTP: req.code, isOTP_verified: false });

        let responseData = await makeSession(getUserDetails, deviceID, deviceType);

        await sendMail({ userMail: await decryption(getUserDetails.email), 
            subject: "Two-step verification mail from sample project..",
            html: `<p>Your two-step verification code is ${req.code}.</p>`
        });

        return resultResponse(res, statusCodes.success, successMessages.loggedIn, responseData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const getUserDetails = async (req, res) => {
    try {
        let userDetails = await users.findOne({ _id: toObjectID(req.user.id) }).lean();

        userDetails.email = await decryption(userDetails.email);

        return resultResponse(res, statusCodes.success, successMessages.success, userDetails);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const updateUser = async (req, res) => {
    try {
        const { firstName = null, lastName = null, age = null } = req.body;

        let userData = await users.findByIdAndUpdate({ _id: toObjectID(req.user.id) }, { firstName, lastName, age });

        return resultResponse(res, statusCodes.success, successMessages.updated, userData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);        
    }
};


const logout = async (req, res) => {
    try {
        await sessions.deleteOne({ userID: toObjectID(req.user.id) });
        return resultResponse(res, statusCodes.success, successMessages.loggedOut);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { signUp, signIn, getUserDetails, updateUser, logout };