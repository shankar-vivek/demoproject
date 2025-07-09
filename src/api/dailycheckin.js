import { toObjectID } from "../database/mongoose.js";
import { dailyCheckInInfo, users } from "../models/modelIndex.js";
import { resultResponse } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
import { decryption } from "../utils/encryption_decryption.js";
const { statusCodes, responseMessages } = constants;
const { successMessages, errorMessages, userTypes } = responseMessages;


const addDailyCheckInQuestions = async (req, res) => {
    try {
        if (req.user.userType === userTypes[0])
            return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.accessNotFound);

        const { currentDate, questionAndAnswers } = { ...req.body, ...req.params, ...req.query };

        let addDailyCheckIn = await dailyCheckInInfo.create({ userID: toObjectID(req.user.id), questionAnswers: questionAndAnswers, 
            date: currentDate 
        });

        await users.updateOne({ _id: toObjectID(req.user.id) }, { dailyCheckInStatus: true });

        return resultResponse(res, statusCodes.success, successMessages.added, addDailyCheckIn);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const fetchDailyCheckIn = async (req, res) => {
    try {
        req.userID = req.params.userID || req.query.userID || null;
        if (req.user.userType === userTypes[0] && !req.userID)
            return resultResponse(res, statusCodes.badRequest, errorMessages.idRequired);
        
        req.getData = req.user.userType === userTypes[0] 
            ? { userID: toObjectID(req.params.userID) } 
        : { userID: toObjectID(req.user.id) };

        let dailyQuestionData = await dailyCheckInInfo.find(req.getData).lean();

        return resultResponse(res, statusCodes.success, successMessages.success, dailyQuestionData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const fetchAllUserDetails = async (req, res) => {
    try {
        if (req.user.userType === userTypes[1])
            return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.unauthorizedUserToProcess);

        req.resultData = await users.find({ userType: userTypes[1] }, { password: 0 }).lean();
        
        if (req.resultData.length) {
            for (let i = 0; i < req.resultData.length; i++) {
                req.resultData[i].email = await decryption(req.resultData[i].email);
            }
        }

        return resultResponse(res, statusCodes.success, successMessages.success, req.resultData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { addDailyCheckInQuestions, fetchDailyCheckIn, fetchAllUserDetails };