import React from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import MainLayout from './layouts/MainLayout';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Group from './pages/Group';
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "chat",
        element: (
          <div className=" flex items-center justify-center h-screen font-semibold text-gray-400">
            Select user to start chat
          </div>
        ),
      },
      {
        path: "chat/userId",
        element: <Chat />,
      },
      {
        path: "group/groupId",
        element: <Group/>,
      },
      {
        path: "profile",
        element: <Profile />
      }

    ]
  },
  {
    path: "*",
    element: <p className="flex justify-center items-center h-screen bg-black text-white font-bold text-[24px]">Page Not Found</p>
  }
])
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}

export default App