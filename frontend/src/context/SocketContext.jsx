import { createContext, useContext } from "react";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};