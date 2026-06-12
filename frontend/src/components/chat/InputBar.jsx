import { GrGallery } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import { useParams } from "react-router";
import { useEffect, useState,useRef } from "react";

const InputBar = ({ setMessages }) => {
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState([]);
  const [sending, setSending] = useState(false)


  const fileInputRef = useRef()
  const { userId } = useParams()
  const token = localStorage.getItem("token")

  const handleSend = async () => {
    setSending(true)
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const formData = new FormData()
      formData.append("text", text)
      fileUrl.forEach((file) => {
        formData.append("files", file)
      })
      const res = await axios.post(`${API_BASE_URL}/api/send-message/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessages((prev) => [
        ...prev,
        res.data.data
      ]); 
      // console.log(res.data.data);
      setText("");
      setFileUrl([]);
    } catch (error) {
      console.log(error.response);
    } finally {
      setSending(false)
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
        onChange={(e) => setFileUrl([...e.target.files])}
      />
      {
        <div>
          {fileUrl.map((file, i) => (
            <div key={i}>
              {file.type.startsWith("image") && (
                <img src={URL.createObjectURL(file)} alt="image" className="w-24 h-24 rounded-lg object-cover" />
              )}
              {file.type.startsWith("video") && (
                <video src={URL.createObjectURL(file)} alt="video" className="w-24 h-24 rounded-lg object-cover" controls />
              )}
              {file.type.startsWith("audio") && (
                <audio src={URL.createObjectURL(file)} alt="audio" className="w-24 h-24 rounded-lg object-cover" controls />
              )}
            </div>
          ))}
        </div>
      }
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !sending) {
            handleSend();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 outline-none text-sm"
      />


      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
        <FaMicrophone className="text-gray-600" />
      </button>

      <button
        onClick={handleSend}
        disabled={sending}
        className={`w-10 h-10 flex items-center justify-center rounded-full
         ${sending ? "bg-gray-400" : "bg-primary"}`}>
        <IoSend className="text-white text-lg" />
      </button>

    </div>
  );
};

export default InputBar;