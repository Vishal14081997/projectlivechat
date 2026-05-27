const express = require("express")
const { signUp, login, getProfile ,updateProfile ,getAllContacts } = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verify.middleware")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/getProfile", verifyToken , getProfile)
router.post("/updateProfile", verifyToken , updateProfile)
router.get("/getAllContacts", verifyToken , getAllContacts)


module.exports = router

