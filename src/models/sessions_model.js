import mongoose, { Schema } from "mongoose";


const sessionsSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    token: { type: String },
    userType: { type: String, enum: ["admin", "user"], default: null },
    deviceID: { type: String, default: null },
    deviceType: { type: String, default: null }
},
    { timestamps: true }
);


export const sessions = mongoose.model("sessions", sessionsSchema);