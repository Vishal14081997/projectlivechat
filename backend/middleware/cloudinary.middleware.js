const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.files) {
            return next()
        }
        const uploadedFiles = [];

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "auto",
                folder: "ChatingApp"
            });

            uploadedFiles.push({
                type: file.mimetype.split("/")[0],
                url: result.secure_url
            });
            req.imageUrl = result.secure_url;
        }
        req.uploadedFiles = uploadedFiles;
        next()
    } catch (error) {
        console.error("cloudinary error:", error.message);
        return res.status(500).json({ message: "cloudinary error" });
    }
}
module.exports = uploadToCloudinary;