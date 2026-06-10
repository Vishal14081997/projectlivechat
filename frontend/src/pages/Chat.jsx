import React from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import MessageArea from '../components/chat/MessageArea'
import InputBar from '../components/chat/InputBar'

const Chat = () => {

  return (
    <>
      <div className="h-screen flex flex-col">
        <ChatHeader />
        <MessageArea />
        <InputBar />
      </div>
    </>
  )
}

export default Chat