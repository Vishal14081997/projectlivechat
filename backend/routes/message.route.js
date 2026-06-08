const express = require("express")
const { getUserById, sendMessage } = require("../controllers/message.controller")
const verifyToken = require("../middleware/verify.middleware")
const upload = require("../middleware/multer.middleware")
const uploadToCloudinary = require("../middleware/cloudinary.middleware")

const router = express.Router()

router.get("/users/:id", verifyToken, getUserById)
router.post("/message/:receiverId", verifyToken, upload.array("files"), uploadToCloudinary, sendMessage)

module.exports = router