const cloudinary = require("../config/cloudinary")
// const fs = require("fs");

const uploadToCloudinary = async (req, res, next) => {
    try {
        if(!req.file){
            return next()
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "ChatingApp"
        });
        req.imageUrl = result.secure_url;
        req.publicId = result.public_id;
        // console.log(req.imageUrl);
        
        // fs.unlinkSync(req.file.path);
        next()
    } catch (error) {
        console.error("cloudinary error:", error.message);
        return res.status(500).json({ message: "cloudinary error" });
    }
}
module.exports = uploadToCloudinary;