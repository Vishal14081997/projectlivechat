import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../api/config";
import {Link , useNavigate} from "react-router-dom"

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/login`, formData);
      console.log(res.data);
      const token = res.data.data.token
      localStorage.setItem("token" ,token)
      toast.success(res.data.message);
      setFormData({ email: "", password: "" });
      navigate("/chat")
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  // chalate ho, state reset ho jati hai lekin input field ko state se value nahi mil rahi, isliye UI me purani value dikhti rehti hai.
  return (
    <div className="h-screen flex flex-col bg-gray-200 items-center justify-center">
      <div className="bg-primary text-white py-6 flex flex-col items-center w-full">
        <h1 className=" font-medium">Login Account</h1>
        <p className="text-2xl">WhatsApp</p>
      </div>

      <div className="w-full bg-white max-w-sm px-6 py-6 flex flex-col gap-4 ">
        <div>
          <h2 className="font-bold text-gray-700">Welcome back</h2>
          <p className="text-sm text-gray-700">Sign in to continue</p>
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
          onClick={handleLogin}
          disabled={loading}
          className="bg-primary text-white py-2 font-medium rounded-full flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-[14px] text-gray-600">
          Don't have an account ? <Link to={"/signup"} className="text-primary font-medium">Sign up</Link> 
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

export default Login;
