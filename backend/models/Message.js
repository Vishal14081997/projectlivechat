const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String
    },
    attachments: [
        {
            type: {
                type: String,
                enum: ["image", "video", "audio"]
            },
            url: String
        }
    ],
    location: {
        lat: Number,
        lng: Number
    }
},
    { timestamps: true }
)
const Message = mongoose.model("Message", messageSchema)
module.exports = Message