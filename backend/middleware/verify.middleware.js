const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log(authHeader);
    const token = authHeader.split(" ")[1]
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user 
    // req.user_id = user._id
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
module.exports = verifyToken;