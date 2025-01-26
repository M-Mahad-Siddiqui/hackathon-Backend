import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Database is already connected");
        return;
    }
    // const MONGO_URI = 'mongodb+srv://nextBi:nextbi@cluster0.fs3d3.mongodb.net/' + DB_NAME;
    const MONGO_URI =`${process.env.MONGO_URI}/${DB_NAME}`;

    try {
        const mongoInstance = await mongoose.connect(MONGO_URI);
        console.log(`\n Connected to MongoDB :-) : ${mongoInstance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export { connectDB };
