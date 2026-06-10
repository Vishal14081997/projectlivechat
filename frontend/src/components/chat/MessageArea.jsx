import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";

const MessageArea = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/message/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
 <div className="flex-1 overflow-y-auto p-4 bg-[#ECE5DD]">
  {messages.map((msg) => {
    const isMe = msg.senderId ;

    return (
      <div
        key={msg._id}
        className={`flex mb-2 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[70%] px-3 py-2 rounded-lg shadow ${
            isMe
              ? "bg-[#DCF8C6] rounded-br-none"
              : "bg-white rounded-bl-none"
          }`}
        >
          <p>{msg.text}</p>

          <p className="text-[10px] text-gray-500 text-right mt-1">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  })}
</div>
  );
};

export default MessageArea;