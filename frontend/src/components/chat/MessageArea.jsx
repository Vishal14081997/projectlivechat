import React from "react";
import { useSocket } from "../../context/SocketContext";
const MessageArea = () => {
 const { socketRef, socketConnected } = useSocket();
 
  return (
    <div>MessageArea</div>
  )

}
export default MessageArea;
