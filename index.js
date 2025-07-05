import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import router from "./src/routes/route_index.js";
import constants from "./src/utils/constants.json" assert { type: "json" };
import "./src/utils/cron.js";
import { connectMongo } from "./src/database/mongoose.js";
import { users } from "./src/models/user_model.js";
const { successMessages } = constants.responseMessages;
const { SERVER_PORT } = process.env;


app.get("/", (req, res) => {
    return res.status(200).send(successMessages.welcomeNote).end();
});


// Middleware setup
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


connectMongo();


app.listen(SERVER_PORT, () => {
    console.log(`Server running...\nPORT ${SERVER_PORT}`);
});


app.use(cors(), express.json({ limit: "200mb" }));

// await users.updateMany({}, { userOTP: null, isOTP_verified: null });


app.use(router);