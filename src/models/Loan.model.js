import mongoose from "mongoose";

// Loan Application Schema
const LoanApplicationSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            enum: ["wedding", "construction", "business", "education"],
            required: true,
            description: "The type of loan category."
        },
        cnic: {
            type: String,
            required: true,
            description: "The CNIC of the applicant, a 13-digit number."
        },
        email: {
            type: String,
            required: true,
            description: "The email address of the applicant."
        },
        loanAmount: {
            type: Number,
            required: true,
            min: 1,
            description: "The amount of the loan requested."
        },
        name: {
            type: String,
            required: true,
            description: "The name of the applicant."
        },
        subcategory: {
            type: String,
            enum: [
                "valima", "furniture", "valima-food", "jahez", "structure", "finishing",
                "loan", "stall", "shop-rent", "shop-assets", "machinery", "university", "child-fees"
            ],
            required: true,
            description: "The specific purpose of the loan."
        }
    },
    { timestamps: true }
);

// Create or get the model
const LoanApplication = mongoose.models.Apply || mongoose.model("Apply", LoanApplicationSchema);

export default LoanApplication;
