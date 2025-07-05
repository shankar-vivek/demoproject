import { sessions } from "../models/modelIndex.js";
import constants from "../utils/constants.json" assert { type: "json" };
import { createJWTToken } from "./commonFunctions.js";
import { decryption } from "./encryption_decryption.js";


export const makeSession = async (dbData, deviceID, deviceType) => {
    try {
            const token = createJWTToken({ id: dbData._id, userType: dbData.userType });
            let insertData;
            let verifySession = await sessions.findOne({ userID: dbData._id });
            if (!verifySession) {
                insertData = { userID: dbData._id, token: token, userType: dbData.userType, deviceID: deviceID, deviceType: deviceType };
                await sessions.create(insertData);
            } else if (Object.keys(verifySession).length) {
                insertData = { token: token, deviceID: deviceID, deviceType: deviceType };
                await sessions.updateOne({ userID: dbData._id }, insertData);
            } else {
                return constants.responseMessages.errorMessages.dbError;
            }
            
            let responseData = { 
                userID: dbData._id, email: await decryption(dbData.email), userType: dbData.userType, token: token ?? null 
            };
            return responseData;
    } catch (err) {
        return err;
    }
};