const express = require("express")
const { signUp, login, getProfile, updateProfile, getAllContacts, uploadImg } = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verify.middleware")
const upload = require("../middleware/multer.middleware")
const uploadToCloudinary = require("../middleware/cloudinary.middleware")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/getProfile", verifyToken, getProfile)
router.put("/updateProfile", verifyToken, upload.single("profileImage"), uploadToCloudinary, updateProfile)
router.post("/uploadImg", upload.single("file"),uploadToCloudinary, uploadImg)
router.get("/getAllContacts", verifyToken, getAllContacts)



module.exports = router

