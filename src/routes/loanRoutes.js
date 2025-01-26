import express from "express";
const loanRouter = express.Router();

import { applyForLoan, getLoanApplicationById, getLoanApplications } from "../controllers/loanController.js";

loanRouter.post("/apply-for-loan", applyForLoan);
loanRouter.get("/get-loan-applications", getLoanApplications);
loanRouter.get("/getLoanApplicationById", getLoanApplicationById);


export default loanRouter;