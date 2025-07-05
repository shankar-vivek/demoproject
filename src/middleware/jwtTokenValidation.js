import { toObjectID } from "../database/mongoose.js";
import { sessions } from "../models/sessions_model.js";
import { resultResponse, verifyJWTToken } from "../utils/commonFunctions.js";
import constants from "../utils/constants.json" assert { type: "json" };
const { statusCodes, responseMessages } = constants;
const { errorMessages } = responseMessages;


export const jwtTokenValidation = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            return resultResponse(res, statusCodes.notFound, errorMessages.headersNotFound);
        
        let headerToken = req.headers['authorization']?.split(' ')[1]  ?? req.headers['Authorization']?.split(' ')[1];
    
        if (!headerToken)
            return resultResponse(res, statusCodes.notFound, errorMessages.tokenNotFound);

        verifyJWTToken(headerToken, async (err, response) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    return resultResponse(res, statusCodes.unauthorizedUser, errorMessages.tokenExpired);

                console.log("Error in token. ", err);
                return resultResponse(res, statusCodes.badRequest, err);
            } else {
                let getSession = await sessions.find({ token: headerToken, userID: toObjectID(response.id) });
                if (!getSession.length)
                    return resultResponse(res, statusCodes.badRequest, errorMessages.sessionNotFound);

                req.user = { id: response.id, userType: response.userType };
                next();
            }
        });
    } catch (error) {
        return resultResponse(res, statusCodes.internalError, errorMessages.internalError, error.message);
    }
};