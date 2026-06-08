import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";
import { useSocket } from "../../context/SocketContext";
import { useState } from "react";
import { useEffect } from "react";

const ChatHeader = () => {
  const [selectedUser, setSelectedUser] = useState();
  const navigate = useNavigate();
  const { userId } = useParams()

  const { onlineUsers, socketConnected, socketRef, token } = useSocket()

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(res.data.data);
      setSelectedUser(res.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [userId])
  return (
    <div className="px-4 py-3 bg-primary flex items-center gap-3">
      <button
        onClick={() => navigate("/chat")}
        className=" text-white text-2xl mr-1 p-2 -m-2"
      >
        <IoArrowBackCircleOutline />
      </button>
      <div
        className="w-9 h-9 rounded-full bg-white text-[#272626] flex items-center justify-center font-medium text-lg overflow-hidden cursor-pointer"
      >
        {
          selectedUser?.profilePic ? (
            <img src={selectedUser?.profilePic} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-black text-3xl font-medium">
              {selectedUser?.fullName?.charAt(0)?.toUpperCase()}
            </span>
          )
        }
      </div>

      <div>
        <p className="text-white font-medium text-sm">{selectedUser?.fullName}</p>
        <p className="text-xs text-green-300">
          {onlineUsers.includes(userId) ? "🟢 Online" : "⚫ Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
