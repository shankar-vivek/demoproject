import mongoose, { Schema } from "mongoose";


const dailyCheckInSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    questionAnswers: { type: Array, default: [] },
    date: { type: Date, default: () => new Date() }
}, {
    timestamps: true
});


export const dailyCheckInInfo = mongoose.model('dailyCheckInInfo', dailyCheckInSchema);