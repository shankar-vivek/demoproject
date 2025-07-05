import cron from 'node-cron';
import { appointmentRemainder } from './commonFunctions.js';


cron.schedule("* * * * *", async () => {
    try {
        console.log("CRON started..");
        await appointmentRemainder();
        console.log("CRON stopped..");
    } catch (error) {
        console.log("ERROR in cron operation ==>>", error);
    }
});