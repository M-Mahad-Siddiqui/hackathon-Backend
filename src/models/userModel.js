
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     studentDetail: { // Corrected field name to match controller
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "StudentDetail",
//     },
//     results : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "resultModel"
//     },

//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         uppercase: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     passed: {
//         type: String,
//         trim: true,
//     },
//     resetOtp: {
//         type: String,
//         default: "",
//     },
//     resetOtpExpireAt: {
//         type: Number,
//         default: 0,
//     },
// });

// const userModel = mongoose.models.userGS || mongoose.model("userGS", userSchema);

// export default userModel;
// import { default as resultModel, default as StudentDetail } from "./Result.model.js";

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
    studentDetail: { // Corrected field name to match controller
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentDetail",
    },

    filename: {
        type: String,
    },
    path: {
        type: String,
    },
    mimetype: { type: String,},


    results: [
        {
            semester: String, 
            gpa :String
        }
    ],

    name: {
        type: String,
        trim: true,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    password: {
        type: String,
        trim: true,
    },
    passed: {
        type: String,
        trim: true,
    },
    resetOtp: {
        type: String,
        default: "",
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0,
    },
});

const userModel = mongoose.models.userGS || mongoose.model("userGS", userSchema);

export default userModel;