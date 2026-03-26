import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js";

dotenv.config()

const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized - no access token provided" });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            
            const user = await User.findById(decoded.userid).select("-password");
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            req.user = user;
            next(); // This moves to your Like/Comment controller
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - token expired" });
            }
            // Handle other JWT errors (like invalid signature)
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
    } catch (error) {
        // Ensure 500 errors also send a JSON response
        return res.status(500).json({ message: error.message });
    }
}

export { protectRoute }