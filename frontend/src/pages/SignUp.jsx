import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/config";
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    // console.log(e.target.name ,e.target.value );
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData);

  const handleSignup = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/signup`, formData);
      console.log(res.data);
      toast.success(res.data.message);
      setFormData({ fullName: "", email: "", password: "" });
      navigate("/login")
    } catch (error) {
      console.log(error.response);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again",
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-200 items-center justify-center">
      <div className="bg-primary text-white py-6 flex flex-col items-center w-full">
        <h1 className="text-[20px] font-medium">Create Account</h1>
        <p className="text-sm">Join WhatsApp today</p>
      </div>

      <div className="w-full bg-white max-w-sm px-6 py-6 flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700"> FULL NAME</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            placeholder="enter your name"
            className="p-2 outline-none border rounded-lg focus:border-primary border-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700"> EMAIL</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="enter your email"
            className="p-2 outline-none border rounded-lg focus:border-primary border-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">PASSWORD</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="*********"
            className="p-2 outline-none border rounded-lg focus:border-primary border-gray-400"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-primary text-white py-2 font-medium rounded-full flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 rounded-full animate-spin border-t-transparent"></div>
          ) : (
            " Create Account"
          )}
        </button>

        <p className="text-center text-[14px] text-gray-600">
          Already have an account ? <Link to={"/login"} className="font-medium text-primary"> Sign in</Link>
        </p>

        <button className="flex justify-center items-center border border-gray-500 rounded-full py-2">
          <img
            src="https://www.google.com/favicon.ico"
            alt=""
            className="w-8 h-8"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
