import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../api/config";

const MainLayout = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("chats");
  const [contacts, setContacts] = useState([])

  const token = localStorage.getItem("token");

  const user = {
    fullName: "Vishal Singh",
  };

  // const contacts = [
  //   {
  //     _id: 1,
  //     fullName: "Rahul Sharma",
  //     profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
  //   },
  // ];
  
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/getAllContacts?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res.data.data);
      setContacts(res.data.data)
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    fetchContacts();
  }, []);


  const groups = [
    {
      _id: 1,
      groupName: "React Developers",
      participants: [1, 2, 3],
      groupIcon: "",
    },
    {
      _id: 2,
      groupName: "React Developers",
      participants: [1, 2, 3],
      groupIcon: "",
    },
  ];

  return (
    <div className="w-screen h-screen flex">

      {/* Sidebar */}
      <div className="bg-gray-100 p-3 w-1/4 ">

        {/* Header */}
        <div className="bg-primary px-4 py-4 flex items-center justify-between">
          <h1 className="text-white text-lg font-semibold">
            {user.fullName}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-white/80 cursor-pointer text-xl p-1">
              <FaPlus />
            </div>

            <div
              onClick={() => navigate("/profile")}
              className="text-white/80 cursor-pointer text-2xl"
            >
              <CgProfile />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b justify-between border-gray-200 bg-gray-100">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-2 text-sm font-medium transition
              ${activeTab === "chats"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
              }`}
          >
            Chats
          </button>

          <button
            onClick={() => setActiveTab("groups")}
            className={`flex-1 py-2 text-sm font-medium transition
              ${activeTab === "groups"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
              }`}
          >
            Groups
          </button>
        </div>

        {/* Contacts / Groups */}
        <div
          style={{
            height: "calc(100vh - 160px)",
            overflow: "auto",
          }}
        >
          {activeTab === "chats" ? (
            <>
              {contacts.map((c) => (
                <div
                  key={c._id}
                  onClick={() => navigate(`/chat/${c._id}`)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 border-b border-gray-100"
                >
                  <div className="relative ">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-lg overflow-hidden">
                      {c.profilePic ? (
                        <img
                          src={c.profilePic}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        c.fullName.charAt(0)
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-900 text-sm">
                        {c.fullName}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      Last message preview...
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {groups.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  <p>No Group Found</p>
                </div>
              ) : (
                groups.map((g) => (
                  <div
                    key={g._id}
                    onClick={() => navigate(`/group/${g._id}`)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 border-b border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-lg overflow-hidden">
                      {g.groupIcon ? (
                        <img
                          src={g.groupIcon}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        g.groupName.charAt(0)
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {g.groupName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {g.participants.length} members
                      </p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 bg-white overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;