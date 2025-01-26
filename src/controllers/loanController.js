import LoanApplication from "../models/Loan.model.js";

export const applyForLoan = async (req, res) => {
  try {
      const { name, email, cnic, loanAmount, subcategory, category } = req.body;

      if (!name || !email || !cnic || !loanAmount || !subcategory || !category) {
          return res.status(400).json({ msg: "Please enter all fields" });
      }

      const loanApplication = new LoanApplication({ name, email, cnic, loanAmount, subcategory, category });
      await loanApplication.save();
      return res.json({ success: true, msg: "Loan application submitted successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error in applying for loan" });
  }
}

export const getLoanApplications = async (req, res) => {
  try {
      const loanApplications = await LoanApplication.find();
      return res.json({ success: true, loanApplications });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error in getting loan applications" });
  }
}

export const getLoanApplicationById = async (req, res) => {
  try {
      const { cnic } = req.query;
      const loanApplication = await LoanApplication.findOne({ cnic });
      if (!loanApplication) {
          return res.status(404).json({ msg: "Loan application not found" });
      }
      return res.json({ success: true, loanApplication });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error in getting loan application" });
  }
}


