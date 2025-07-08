import express from "express";
import { jwtTokenValidation } from "../middleware/jwtTokenValidation.js";
import { getUserDetails, logout, updateUser } from "../api/userEntryFlow.js";
import { createUserAppointment, getUpcomingAppointments, updateAppointment } from "../api/appointments.js";
import { addDailyCheckInQuestions, fetchAllUserDetails, fetchDailyCheckIn } from "../api/dailycheckin.js";
import { verifyAppointmentID } from "../middleware/commonMiddlewares.js";
const router = express.Router();


router.get("/fetchUserDetails", jwtTokenValidation, getUserDetails);
router.post("/updateuser", jwtTokenValidation, updateUser);
router.get("/logout", jwtTokenValidation, logout);


router.get("/fetchAllUsers", jwtTokenValidation, fetchAllUserDetails);


router.post("/addAppointment", jwtTokenValidation, createUserAppointment);
router.get("/fetchUpcomingAppointment", jwtTokenValidation, getUpcomingAppointments);
router.post("/updateAppointment", jwtTokenValidation, verifyAppointmentID, updateAppointment);


router.post("/addDailyCheckIn", jwtTokenValidation, addDailyCheckInQuestions);
router.get("/fetchDailyCheckIn", jwtTokenValidation, fetchDailyCheckIn);


export default router;