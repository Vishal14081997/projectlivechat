const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    phoneNo: {
        type: String
    },
    fullName: {
        type: String
    },
    profilePic: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        minlength: 6
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema)
module.exports = User;