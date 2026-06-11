import { GrGallery } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

const InputBar = () => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef()
  const { userId } = useParams()
  const token = localStorage.getItem("token")

  const handleSend = async () => {
    try {
      const formData = new FormData()
      formData.append("text", text)
      attachments.forEach((file) => {
        formData.append("files", file)
      })
      const res = await axios.post(`${API_BASE_URL}/api/send-message/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);
      setText("");
      setAttachments([]);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="bg-[#F0F0F0] px-3 py-4 flex items-center gap-2 border-t border-gray-200">

      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
        <BsEmojiSmile className="text-xl text-gray-600" />
      </button>

      <button onClick={() => fileInputRef.current.click()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
        <GrGallery className="text-xl text-gray-600" />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={fileInputRef}
        onChange={(e) => setAttachments([...e.target.files])}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 outline-none text-sm"
      />

      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
        <FaMicrophone className="text-gray-600" />
      </button>

      <button
        onClick={handleSend}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00BFA5]">
        <svg width="22" height="18" fill="white" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>

    </div>
  );
};

export default InputBar;