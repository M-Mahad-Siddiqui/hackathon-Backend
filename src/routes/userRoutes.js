import express from 'express';
import { addUserDetails, getUserData } from '../controllers/userController.js';
import upload from "../middlewares/uploadMiddleware.js";
import userAuth from "../middlewares/userAuth.js";
 

const userRouter = express.Router()

userRouter.get('/data', userAuth, getUserData);
userRouter.post('/add-details', userAuth, upload.single('file'), addUserDetails);

export default userRouter;

/*
 {
            "_id": "5f42fc5c1f2f3a4b78c9d0ef",
            "batch": "22",
            "year": "thirdYear",
            "department": "BSCS",
            "semester": "fifth",
            "section": "A",
            "fatherName": "John Doe Sr.",
            "motherName": "Jane Doe",
            "gender": "Male",
            "dob": "2000-05-15",
            "cnic": 1234567890123,
            "isSingle": "Single",
            "phone": 3001234567,
            "address": "123 Main St, Lahore, Pakistan",
            "bloodGroup": "O+"
        }
        
        */
       