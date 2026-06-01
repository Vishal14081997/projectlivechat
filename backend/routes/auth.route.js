const express = require("express")
const { signUp, login, getProfile ,updateProfile ,getAllContacts,uploadImg } = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verify.middleware")
const upload = require("../middleware/multer.middleware")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/getProfile", verifyToken , getProfile)
router.post("/updateProfile", verifyToken ,upload.single("image"), updateProfile)
router.post("/uploadImg", upload.single("image"), uploadImg)
router.get("/getAllContacts", verifyToken , getAllContacts)


module.exports = router

