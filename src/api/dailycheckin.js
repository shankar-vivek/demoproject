import { toObjectID } from "../database/mongoose.js";
import { dailyCheckInInfo, users } from "../models/modelIndex.js";
import { resultResponse } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
const { statusCodes, responseMessages } = constants;
const { successMessages, errorMessages } = responseMessages;


const addDailyCheckInQuestions = async (req, res) => {
    try {
        if (req.user.userType === "admin")
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
        req.getData = req.user.userType === "admin" ? {} : { userID: toObjectID(req.user.id) };

        let dailyQuestionData = await dailyCheckInInfo.find(req.getData).lean();

        return resultResponse(res, statusCodes.success, successMessages.success, dailyQuestionData);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { addDailyCheckInQuestions, fetchDailyCheckIn };