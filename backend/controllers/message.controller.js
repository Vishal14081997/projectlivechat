const Message = require("../models/Message");
const User = require("../models/User")
const { getIO } = require("../services/socket")

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
const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { receiverId } = req.params;
        const senderId = req.user._id;
        const receiver = await User.findById(receiverId)
        if (!receiver) {
            return res.status(404).json({
                message: "Receiver not found"
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text: text || "",
            attachments: req.uploadedFiles || []
        });

        const io = getIO()
        console.log("receiver", receiverId);
        io.to(receiverId.toString()).emit(
            "newMessage",
            newMessage
        );
        console.log("event emitted");
        res.status(200).json({
            message: "message send successfully",
            data: newMessage
        })
    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { getUserById, sendMessage }