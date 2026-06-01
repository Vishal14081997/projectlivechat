import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

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
          <span className="text-white text-3xl font-medium">V</span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>

        <p className="text-white font-medium">Vishal Singh</p>
        <p className="text-white/70 text-sm">vishal@gmail.com</p>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#00BFA5] font-medium uppercase tracking-wide mb-3">
            Account Info
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button className="bg-primary text-white rounded-full py-3 text-sm font-medium">
          Update Profile
        </button>

        {/* Logout Button */}
        <button className="bg-red-500 text-white rounded-full py-3 text-sm font-medium">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;