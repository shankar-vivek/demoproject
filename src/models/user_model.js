import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    email: { type: String, default: null },
    password: { type: String, default: null },
    userType: { type: String, enum: ["admin", "user"], default: 'user' },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    age: { type: Number, default: null },
    userAccess: { type: String, default: 'editor' },
    is_oauth: { type: Boolean, default: false },
    userOTP: { type: Number, maxlength: 4, default: null },
    isOTP_verified: { type: Boolean, default: false },
    dailyCheckInStatus: { type: Boolean, default: false }
},  {
    timestamps: true
});


export const users = mongoose.model('users', userSchema);