import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./db/index.js";
// route import 
import authRouter from './routes/authRoutes.js';
import fileRouter from "./routes/fileRoute.js";
import loanRouter from './routes/loanRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


// //api endsPoint
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use("/api/file", fileRouter);
app.use('/uploads', express.static('uploads'));
app.use('/loan', loanRouter )
// app.use('/uploads', express.static('uploads'));




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
})