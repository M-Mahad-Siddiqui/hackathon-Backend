import express from "express"
import userAuth from "../middlewares/userAuth.js"
const authRouter = express.Router()

import { entryPoint, isAuthenticated, logout, resetPassword, sendPasswordResetOtp, UpdatePassword } from "../controllers/authController.js"

authRouter.post("/entry-point", entryPoint)
authRouter.patch("/updatePassword", UpdatePassword)
// authRouter.post("/register", register)
// authRouter.post("/login", login)
authRouter.post("/logout", logout)
// authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp)
// authRouter.post("/verify-account", userAuth, verifyEmail)
authRouter.get("/is-auth", userAuth, isAuthenticated)
authRouter.post("/send-reset-password-otp", sendPasswordResetOtp)
authRouter.post("/reset-password", resetPassword)


export default authRouter;

//1   /api/auth/register
//2   /api/auth/login
//3   /api/auth/logout  soon
//4   /api/auth/send-verify-otp
//5   /api/auth/verify-account
//6   /api/auth/send-reset-password-otp
//7   /api/auth/reset-password
//8   /api/auth/is-auth
