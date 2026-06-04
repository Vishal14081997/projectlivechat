import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

const Profile = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // await new Promise((resolve)=>{
      //   setTimeout(resolve,3000)
      // })
      const res = await axios.get(`${API_BASE_URL}/api/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.user);
      setFormData(res.data.user);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      if (selectedImage) {
        data.append("profileImage", selectedImage);
      }
      const res = await axios.put(
        `${API_BASE_URL}/api/updateProfile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(res.data);
      // const updatedUser = { ...user, ...res.data.user };
      // localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (error) {
      console.log(error.response);
    } finally {
      setUpdating(false);
    }
  };
  const handleImageChange = (e) => {
    console.log(e.target);
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  }
  const handleLogout = async () => {
    setLogoutLoading(true);
    localStorage.clear();
    navigate("/login")
  }
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-15 h-15 border-4 border-primary rounded-full border-t-transparent animate-spin mx-auto "></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-primary px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/chat")}
          className="text-white text-[28px]"
        >
          <IoArrowBackCircleOutline />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-primary pb-8 pt-4 flex flex-col items-center">
        <label className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer overflow-hidden mb-3">
          {
            selectedImage ? (
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : formData.profilePic}
                className="w-full h-full object-cover rounded-full"
              />

            ) : (
              <span className="text-white text-3xl font-medium">
                {formData.fullName?.charAt(0)?.toUpperCase()}
              </span>
            )
          }
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>

        <p className="text-white font-medium">{formData.fullName}</p>
        <p className="text-white/70 text-sm">{formData.email}</p>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#00BFA5] font-medium uppercase tracking-wide mb-3">
            Account Info
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                placeholder="Enter Full Name"
                value={formData.fullName}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter Email"
                value={formData.email}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdateProfile}
          disabled={updating}
          className="bg-primary text-white rounded-full py-3 text-sm font-medium"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="bg-red-500 text-white rounded-full py-3 text-sm font-medium flex justify-center items-center">
          {logoutLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
