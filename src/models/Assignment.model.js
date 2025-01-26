import mongoose from "mongoose";

// Assignment Schema
const AssignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher",
            required: true,
        },
    },
    { timestamps: true }
);
const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);

export default Assignment;