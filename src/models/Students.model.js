import mongoose from "mongoose";

// Student Detail Schema
const StudentDetailSchema = new mongoose.Schema({
    // image: [{ path: String, filename: String }],
    image: [
        {
            type: String,
        }
    ],

    filename: {
        type: String,
    },
    path: {
        type: String,
    },
    mimetype: { type: String,  },

    batch: {
        type: String,
        enum: ["18", "19", "20","21", "22", "23", "24", "25", "26", "27"],
    },
    workExperience: {
        type: String,
},
    department: {
        type: String,
        enum: ["BSCS", "BSAI", "BSDS", "AR", "BSCY"],
    },
    homePhone: {
        type: Number,
    },
    section: {
        type: String,
        default: null,
    },
    gmail: {
        type: String,
        trim: true,
    },
    fatherName: {
        type: String,
        default: "",
        maxlength: [100, "Father's name can't be longer than 100 characters"],
    },
    motherName: {
        type: String,
        default: "",
        maxlength: [100, "Mother's name can't be longer than 100 characters"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // You can add more options if needed
    },
    dob: {
        type: String,
        default: "",
    },
    cnic: {
        type: Number,
        // validate: {
        //     validator: function (value) {
        //         return value && value.toString().length === 13; // CNIC should be 13 digits
        //     },
        //     message: "CNIC must be 13 digits long",
        // },
    },
    isSingle: {
        type: String,
        enum: ["Single", "Married"], // Assuming isSingle represents marital status
    },
    phone: {
        type: Number,
        minlength: [10, "Phone number should be at least 10 digits long"],
    },
    address: {
        type: String,
        default: "",
        maxlength: [200, "Address can't be longer than 200 characters"],
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
});

const StudentDetail = mongoose.models.StudentDetail || mongoose.model("StudentDetail", StudentDetailSchema);

export default StudentDetail;


