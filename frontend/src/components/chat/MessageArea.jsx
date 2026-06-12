import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";
import { useSocket } from "../../context/SocketContext";

const MessageArea = ({ messages, setMessages }) => {
  const { userId } = useParams();
  const bottomRef = useRef(null)
  const { onlineUsers, socketConnected, socketRef, token } = useSocket()
  const loginUser = JSON.parse(localStorage.getItem("user"));

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
      // console.log(res.data.data);
      setMessages(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  useEffect(() => {
    if (!socketRef.current) return

    const handleMessage = (msg) => {
      console.log("socket message", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socketRef.current.on("newMessage", handleMessage)
    return () => {
      socketRef.current.off("newMessage")
    }
  }, [socketConnected])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2]">
      {messages.map((msg) => {
        const isMe =
          msg.senderId === loginUser?._id ||
          msg.senderId?._id === loginUser?._id;

        return (
          <div
            key={msg._id}
            className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg shadow ${isMe
                ? "bg-[#DCF8C6]"
                : "bg-white"
                }`}
            >
              {/* Text */}
              {msg.text && (
                <p className="text-sm break-words">
                  {msg.text}
                </p>
              )}

              {/* Images */}
              {msg.imageUrl?.length > 0 &&
                msg.imageUrl.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="message"
                    className="mt-2 rounded-lg max-w-[250px]"
                  />
                ))}

              {/* Videos */}
              {msg.videoUrl?.length > 0 &&
                msg.videoUrl.map((video, index) => (
                  <video
                    key={index}
                    controls
                    className=" rounded-lg max-w-[250px]"
                  >
                    <source src={video} />
                  </video>
                ))}

              {/* Audio */}
              {msg.audioUrl?.length > 0 &&
                msg.audioUrl.map((audio, index) => (
                  <audio
                    key={index}
                    controls
                    className="mt-2 w-full"
                  >
                    <source src={audio} />
                  </audio>
                ))}

              {/* Time */}
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
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageArea;