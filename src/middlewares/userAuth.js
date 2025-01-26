// //this function find the token in cookie from this cookie we can get the user id in order to send userID with otp response
import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
    // const { token } = req.cookies; // Get token from cookies
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authenticated. Please login again." });
    }

    try {
        // Verify the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id; // Set the user ID for subsequent use
            req.userId = tokenDecode.id; // Add userId to the request object
            next(); // Call next middleware or controller
        } else {
            return res.status(401).json({ success: false, message: "Not Authenticated. Login again." });
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Not Authenticated. Please login again." });
    }
};

export default userAuth;


