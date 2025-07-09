import { toObjectID } from "../database/mongoose.js";
import { addMinutesByTimestamp } from "../utils/commonFunctions.js";
import { appointments } from "../models/modelIndex.js";
import { resultResponse } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
const { statusCodes, responseMessages } = constants;
const { successMessages, errorMessages, userTypes } = responseMessages;


const createUserAppointment = async (req, res) => {
    try {
        if (req.user.userType === userTypes[0])
            return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.accessNotFound);

        const { date, startTime, endTime, remindBefore } = req.body;

        let insertData = {
            userID: toObjectID(req.user.id),
            date,
            startTime, 
            endTime, 
            remindBefore,
            remindTime: addMinutesByTimestamp(new Date(startTime), Number(remindBefore))
        }, userNewAppointment;

        userNewAppointment = await appointments.create(insertData);

        return resultResponse(res, statusCodes.success, successMessages.added, userNewAppointment);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const updateAppointment = async (req, res) => {
    try {
        const { date = null, appointmentStatus = null, startTime = null, endTime = null } = req.body;

        let insertData;
        Object.entries({ date, appointmentStatus, startTime, endTime }).forEach(([ key, value ]) => {
            if (!value)
                insertData[key] = req.appointmentData[key];
            else
                insertData[key] = value;
        });

        req.updateAppointment = await appointments.findByIdAndUpdate({ _id: req.appointmentData._id }, insertData);
        return resultResponse(res, statusCodes.success, successMessages.updated, req.updateAppointment);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


const getUpcomingAppointments = async (req, res) => {
    try {
        req.userID = req.params.userID || req.query.userID || null;
        if (req.user.userType === userTypes[0] && !req.userID)
            return resultResponse(res, statusCodes.badRequest, errorMessages.idRequired);

        req.getData = req.user.userType === userTypes[0] 
            ? { userID: toObjectID(req.params.userID), date: { $gte: new Date().toISOString().split("T")[0] } } 
        : { userID: toObjectID(req.user.id), date: { $gte: new Date().toISOString().split("T")[0] } };

        req.result = await appointments.find(req.getData).sort({ date: -1 }).lean();
        return resultResponse(res, statusCodes.success, successMessages.success, req.result);
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};


export { createUserAppointment, getUpcomingAppointments, updateAppointment };