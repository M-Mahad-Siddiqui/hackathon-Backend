import mongoose from "mongoose";
// Creater Schema
const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
    },
    { timestamps: true }
);
const teacher = mongoose.models.teacher || mongoose.model("teacher", teacherSchema);

export default teacher;