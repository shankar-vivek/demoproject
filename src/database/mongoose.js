import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { DATABASE_CONNECTION_STRING } = process.env;


export const connectMongo = async () => {
    try {
        await mongoose.connect(DATABASE_CONNECTION_STRING, { 
            maxPoolSize: 200,
            family: 4,
        });
        console.log("Creating collections !!!\nMongoDb connected...");
    } catch (error) {
        console.log("DB connectivity error ", error);
    }
};


export const toObjectID = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return new mongoose.Types.ObjectId(id);
};