
import { io } from "socket.io-client";

let socket = null;
let socketInitialized = false;

export const initializeSocket = () => {
  const token = localStorage.getItem("token");
  
  // Return existing socket if already initialized
  if (socket && socketInitialized) {
    return socket;
  }
  
  // Create new socket only once
  if (!socket) {
    socket = io("http://localhost:3000", {
      transports: ["websocket"],
      autoConnect: true,
      auth: {
        token: token || ""
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socketInitialized = true;
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    socketInitialized = false;
  }
};

export default socket;
