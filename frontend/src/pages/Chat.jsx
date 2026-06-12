import React from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import MessageArea from '../components/chat/MessageArea'
import InputBar from '../components/chat/InputBar'
import { useState } from 'react'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  return (
    <>
      <div className="h-screen flex flex-col">
        <ChatHeader />
        <MessageArea messages={messages} setMessages={setMessages} />
        <InputBar setMessages={setMessages} />
      </div>
    </>
  )
}

export default Chat