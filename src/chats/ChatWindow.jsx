// src/components/chat/ChatWindow.jsx
import { useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({
  socket,
  messages,
  setMessages,
  projectId,
  userId,
  userRole,
  otherUserId
}) {
  useEffect(() => {
    if (!socket) return;

    console.log("Setting up message listener for project:", projectId);

    // Listen for new messages in this project's room
    const handleReceiveMessage = (msg) => {
      console.log("Received message event from server:", msg);
      
      // Only add message if it belongs to this project
      if (msg.projectId === projectId) {
        setMessages((prev) => {
          // Check if this exact message already exists (by real ID)
          const messageExists = prev.some(m => m._id === msg._id);
          
          if (messageExists) {
            console.log("Message with ID already exists:", msg._id);
            return prev;
          }

          // Helper to extract sender ID
          const getSenderId = (m) => {
            if (typeof m.senderId === 'string') return m.senderId;
            return m.senderId?._id;
          };

          const newSenderId = getSenderId(msg);

          // Remove any temp messages with same content from same sender
          // (these are optimistic messages that we're now replacing with the real one)
          const filtered = prev.filter(m => {
            if (!m._id.startsWith('temp_')) return true; // Keep non-temp messages
            
            const existingSenderId = getSenderId(m);
            // Remove if it's a temp message with same content and sender
            if (m.message === msg.message && existingSenderId === newSenderId) {
              console.log("Removing temp message:", m._id);
              return false;
            }
            return true;
          });

          console.log("Adding real message from server:", msg._id);
          return [...filtered, msg];
        });
      } else {
        console.log("Message for different project:", msg.projectId, "Expected:", projectId);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, projectId, setMessages]);

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      background: "#f8f8f8"
    }}>
      <div style={{ 
        background: "linear-gradient(135deg, #0b87c1 0%, #0a6fa0 100%)", 
        color: "white", 
        padding: "16px 20px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" }}>
          💬 Project Chat
        </h3>
        <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>
          Project ID: {projectId}
        </p>
      </div>
      <MessageList messages={messages} userId={userId} />
      <MessageInput
        socket={socket}
        projectId={projectId}
        userId={userId}
        userRole={userRole}
        otherUserId={otherUserId}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatWindow;
