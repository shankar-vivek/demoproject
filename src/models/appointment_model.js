import mongoose, { Schema } from "mongoose";


const appointmentSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date, default: () => new Date() },
    appointmentStatus: { type: String, enum: ["pending", "accepted", "cancelled"], default: "pending" }, 
    startTime: { type: Date, default: () => new Date() },
    endTime: { type: Date, default: () => new Date() },
    remindBefore: { type: Number, default: null },
    remindTime: { type: Date, default: () => new Date() },
}, {
    timestamps: true
});


export const appointments = mongoose.model('appointments', appointmentSchema);