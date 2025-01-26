import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { PASSWORD_RESET_TEMPLATE } from "../utils/emailTemplate.js";
import transporter from "../utils/nodemailer.js";

export const entryPoint = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        // If user exists, log them in
        if (existingUser && existingUser.name !== "" && existingUser.password !== "") {
            login(req, res);
            // if user exists but password is empty, sign them up
        } else if (existingUser && existingUser.passed === "notset") {
            signUp(req, res);
        }
        // If user doesn't exist, register them up
        else {
            register(req, res);
        }

    } catch (error) {
        console.error("Error in entry point controller:  ", error);
        return res.status(500).json({ msg: "Error in entry point controller" });
    }
}
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "Please enter all fields" });

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        // copy password
        const passed = password;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userModel({ name, email, passed, password: hashedPassword });

        // Save the user
        await user.save();

        // Create JWT payload
        const payload = { id: user._id, name: user.name };

        // Sign the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, async (err, token) => {
            if (err) {
                return res.status(500).json({ msg: "Error generating token" }); // Handle JWT error
            }

            // Set the token in cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use only in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Strict mode for local dev
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            // sending welcome email
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Welcome to our app",
                text: `Thank you ${name} for registering with us`
            };

            // await transporter.sendMail(mailOptions);

            return res.json({ success: true, message: "User registered successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in registering the user");
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // Create JWT payload
        const payload = { id: user._id, name: user.name };

        // Sign the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ msg: "Error generating token" });
            }

            // Set the token in cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use only in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Strict mode for local dev
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return res.json({ success: true, message: "User logged in successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in logging in the user");
    }
}

export const logout = async (req, res) => {
    try {
        // Clear cookie when logging out
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        return res.json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error in logging out" });
    }
}

// if user exists but password is empty simply update the password
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) return res.status(400).json({ msg: "Please enter all fields" });

    try {
        // Find the user by email and check if user exists
        let existingUser = await userModel.findOne({ email });

        if (existingUser) {
            // Check if user already has password set, and proceed with updating if 'notset'
            if (existingUser.passed === "notset") {
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password

                // Update user fields
                existingUser.passed = password; // Mark as completed
                existingUser.password = hashedPassword;
                existingUser.name = name;

                // Save the user after password update
                await existingUser.save();

                // Create JWT payload
                const payload = { id: existingUser._id, name: existingUser.name };

                // Sign the token
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, async (err, token) => {
                    if (err) {
                        return res.status(500).json({ msg: "Error generating token" }); // Handle JWT error
                    }

                    // Set the token in cookies
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // For local dev
                        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiration
                    });

                    // Optionally, send a welcome email here (disabled for now)
                    const mailOptions = {
                        from: process.env.SENDER_EMAIL,
                        to: email,
                        subject: "Welcome to our app",
                        text: `Thank you ${name} for registering with us`
                    };

                    // await transporter.sendMail(mailOptions); // Un-comment when ready

                    return res.json({ success: true, message: "User registered successfully" });
                });
            } else {
                // User is already completed but trying to sign up again (should not happen)
                return res.status(400).json({ msg: "User already completed registration." });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in signing up the user");
    }
};

export const UpdatePassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            existingUser.passed = password;
            await existingUser.save();

            return res.json({ success: true, message: "Password updated successfully" });
        }else {
            return res.status(400).json({ msg: "failed User does not exist" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error in signing up the user");
    }
}

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, msg: "User is authenticated :-) " });
    } catch (error) {
        res.json({ success: false, msg: "Error in checking authentication" });
    }
}

// send password reset otp
export const sendPasswordResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, msg: "Please provide email" });
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 60 * 60 * 1000; // 1 hours
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your password reset OTP is ${otp}. Please use this OTP to reset your password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email).replace("{{name}}", user.name)
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, msg: "Password reset OTP sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error in sending password reset otp" });
    }
}

// reset user password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, msg: "Please provide all fields email otp and new password" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        if (user.resetOtp !== otp || user.resetOtp === "") {
            return res.status(400).json({ success: false, msg: "Invalid OTP" });
        }
        if (Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ success: false, msg: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = null;
        await user.save();
        return res.json({ success: true, msg: "Password reset successfully :-) " });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error in resetting password" });
    }
}

// export const signUped = async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) return res.status(400).json({ msg: "Please enter all fields" });

//     try {
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser && existingUser.passed === "notset") {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             existingUser.passed = password;
//             existingUser.name = name;
//             existingUser.password = hashedPassword;
//             await existingUser.save();

//             return res.json({ success: true, message: "Password updated successfully" });
//         } else {
//             return res.status(400).json({ msg: "complete User already exists" });
//         }
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).send("Error in signing up the user");
//     }
// }