import express from "express";
import { decodeIDTokenOfOAuth, passwordValidation, verifyUserExistance, verifyUserID } from "../middleware/commonMiddlewares.js";
import { signIn, signUp } from "../api/userEntryFlow.js";
import { jwtTokenValidation } from "../middleware/jwtTokenValidation.js";
import { resendMailOTP, verifyMailOTP } from "../api/mail_otp_verification_resend.js";

const router = express.Router();


router.post("/signUp", decodeIDTokenOfOAuth, verifyUserExistance, passwordValidation, signUp);
router.post("/signIn", decodeIDTokenOfOAuth, passwordValidation, signIn);


router.post("/verifyMailCode", jwtTokenValidation, verifyUserID, verifyMailOTP);
router.get("/resendMailCode", jwtTokenValidation, verifyUserID, resendMailOTP);


export default router;