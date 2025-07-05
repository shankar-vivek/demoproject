import express from "express";
const router = express.Router();


import signUp_signIn from "./signup_signin.js";
import userDetails from "./user_api.js";


router.use(signUp_signIn);
router.use("/user", userDetails);


export default router;