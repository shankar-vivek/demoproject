import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { appointments } from "../models/appointment_model.js";
import { sendMail } from "./mailService.js";
import { decryption } from "./encryption_decryption.js";
const { JWT_PRIVATE_KEY, JWT_TOKEN_EXPIRY_TIME, ROUNDS } = process.env;


const resultResponse = (res, statusCode, message, data = []) => {
    res.status(statusCode).send({ message, data });
};


const createJWTToken = (data) => {
    try {
        let token = jwt.sign(data, JWT_PRIVATE_KEY, { expiresIn: JWT_TOKEN_EXPIRY_TIME });
        return token;
    } catch (error) {
        console.log("jwtTokenError>>>>>>>>>>>>", error);
        return error;
    }
};


const verifyJWTToken = (token, callback) => {
    try {
        jwt.verify(token, JWT_PRIVATE_KEY, callback);
    } catch (error) {
        return error;
    }
};


const emailAndPasswordFormatVerification = async (type, notValidString) => {
    try {
        let validationRegex;
        switch (type) {
            case 'email':
                validationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            break;
            case "password":
                validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&_])[A-Za-z\d@.#$!^%*?&_]{8,15}$/;
            break;
        }

        return notValidString.match(validationRegex);
    } catch (error) {
        console.log("tryCatchError>>>>>>>>> ", error);
        return false;
    }
};


const passwordHashing = (stringPassword) => {
    try {
        const hashedPassword = bcrypt.hashSync(stringPassword, bcrypt.genSaltSync(parseInt(ROUNDS)));
        return hashedPassword;
    } catch (error) {
        return error;
    }
};


const passwordVerification = (inputPassword, storedPassword) => {
    try {
        const passwordStatus = bcrypt.compareSync(inputPassword, storedPassword);
        return passwordStatus;
    } catch (error) {
        return error;
    }
};


const appointmentRemainder = async () => {
    try {
        let gte, lt, now = new Date();

        gte = `${new Date().toISOString().split("T")[0]}T${now.toLocaleTimeString('en-GB', { hour12: false })}Z`;

        const nextMinute = new Date(now.getTime() + 60 * 1000);

        lt = `${new Date().toISOString().split("T")[0]}T${nextMinute.toLocaleTimeString('en-GB', { hour12: false })}Z`;

        let getCurrentAppointments = await appointments.find({ remindTime: { $gte: gte, $lt: lt } }).populate('userID').lean();

        if (getCurrentAppointments.length) {
            for (let i = 0; i < getCurrentAppointments.length; i++) {
                let dateTimeArray = getCurrentAppointments[i].startTime.toISOString().split('T');
                await sendMail({ userMail: await decryption(getCurrentAppointments[i].userID.email), 
                    subject: "Appointment remainder...",
                    html: `<p>You have an appointment on ${dateTimeArray[0]} at ${dateTimeArray[1].slice(0, 5)}.</p>`
                });
            }
        }

        return true;
    } catch (error) {
        return error;
    }
};


const generateNdigitsNumber = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
};


const addMinutesByTimestamp = (date, minutesToAdd) => {
    const millisecondsToAdd = -minutesToAdd * 60 * 1000;
    return new Date(date.getTime() + millisecondsToAdd);
};


export { resultResponse, createJWTToken, verifyJWTToken, emailAndPasswordFormatVerification, passwordHashing, passwordVerification, 
    appointmentRemainder, generateNdigitsNumber, addMinutesByTimestamp   
};