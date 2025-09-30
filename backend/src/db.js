import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default async() => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error");
        console.log(error);
    }
};