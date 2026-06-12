const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }
    req.imageUrl = [];
    req.videoUrl = [];
    req.audioUrl = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mp3", "mov", "mkv", "webm"],
        folder: "ChatingApp",
      });

      if (file.mimetype.startsWith("image")) {
        req.imageUrl.push(result.secure_url);
      }

      if (file.mimetype.startsWith("video")) {
        req.videoUrl.push(result.secure_url);
      }

      if (file.mimetype.startsWith("audio")) {
        req.audioUrl.push(result.secure_url);
      }
    }

    next();
  } catch (error) {
    console.error("cloudinary error:", error.message);
    return res.status(500).json({ message: "cloudinary error" });
  }
};
module.exports = uploadToCloudinary;