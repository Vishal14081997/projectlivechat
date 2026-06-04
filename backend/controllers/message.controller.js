const User = require("../models/User")

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User get successfully",
            data: user
        });
    } catch (error) {
        console.log("Error in getUserById:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { getUserById }