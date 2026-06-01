const User = require("../models/User")
const jwt = require("jsonwebtoken")


const signUp = async (req, res) => {
  try {
    const { email, phoneNo = "1234567890", fullName, password } = req.body

    if (!email || !phoneNo || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "user alredy exists" })

    const newUser = await User.create({ email, phoneNo, fullName, password })

    res.status(201).json({
      message: "Account create successfully",
      data: newUser
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email })

    console.log(user);

    if (user.password !== password) {
      return res.status(400).json({ message: "password is increate" })
    }
    const payload = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.status(200).json({
      message: "login successfully",
      data: { user, token }
    })

  } catch (error) {
    console.log("login error", error);
    res.status(500).json({ message: error.message });
  }
}
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id
    console.log(userId);
    // console.log(req.user);
    // console.log("this is profile page");
    // res.status(200).json({message:"hello profile " ,user})
    const user = await User.findById(userId).select("-password")
    console.log(user);
    res.status(200).json({
      message: "get profile",
      user: user
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select("-password"); 
    res.status(200).json({
      message: "profile update successfully",
      user: updateUser
    })
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
}

const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { search } = req.query;

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit
    let query = { _id: { $ne: loggedInUserId } };
    if (search) {
      query.fullName = { $regex: search, $options: "i" };
    }
    const user = await User.find(query).select("-password").skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
    const totalUsers = await User.countDocuments(query);
    res.status(200).json({
      currentPage: page,
      totalPage: Math.ceil(totalUsers / limit),
      totalUsers: totalUsers,
      data: user
    });
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const uploadImg = async (req, res) => {
  try {
    console.log(req.file);

    res.status(200).json({
      success: true,
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { signUp, login, getProfile, updateProfile, getAllContacts ,uploadImg }

