// src/components/chat/MessageList.jsx
import { useEffect, useRef, useContext } from "react";
import UserContext from "../context/userContext";

function MessageList({ messages, userId }) {
  const endRef = useRef(null);
  const { user } = useContext(UserContext);

  // Deduplicate messages by ID
  const uniqueMessages = Array.isArray(messages) ? 
    messages.filter((msg, index, self) => 
      index === self.findIndex((m) => m._id === msg._id)
    ) 
    : [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [uniqueMessages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

//   const getSenderName = (msg) => {
//   const sender =
//     typeof msg.senderId === "object" ? msg.senderId : null;

//   // If current logged-in user
//   if (
//     (sender?._id && sender._id === userId) ||
//     msg.senderId === userId
//   ) {
//     return "You";
//   }

//   // If backend sent populated sender
//   if (sender) {
//     if (sender.role === "brand") return "Brand";
//     if (sender.role === "producer") return "Producer";
//     return sender.firstName || "User";
//   }

//   return "User";
// };

  const getSenderName = (msg) => {
    // Extract sender ID whether it's a string or object
    const senderId = typeof msg.senderId === 'string' ? msg.senderId : msg.senderId?._id;
    
    // Check if current user sent this message
    if (senderId === userId) {
      return "You";
    }
    
    // If sender info is populated as object, show their name
    if (msg.senderId?.firstName) {
      return msg.senderId.firstName;
    }
    
    if (msg.senderId?.email) {
      return msg.senderId.email.split('@')[0];
    }
    
    return "Other";
  };

  return (
    <div style={{ 
      flex: 1, 
      padding: "16px", 
      overflowY: "auto", 
      display: "flex", 
      flexDirection: "column",
      gap: "8px"
    }}>
      {messages.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999", margin: "auto" }}>
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <>
          {uniqueMessages.map((msg) => {
            // Extract sender ID whether it's a string or object
            const senderId = typeof msg.senderId === 'string' ? msg.senderId : msg.senderId?._id;
            const isCurrentUser = senderId === userId;
            
            return (
            <div
              key={msg._id}
              style={{
                display: "flex",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                marginBottom: "4px"
              }}
            >
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: isCurrentUser ? "flex-end" : "flex-start",
                maxWidth: "70%"
              }}>
                <span style={{ 
                  fontSize: "12px", 
                  color: "#666", 
                  marginBottom: "4px",
                  fontWeight: "600"
                }}>
                  {getSenderName(msg)}
                </span>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: isCurrentUser ? "#0b87c1" : "#e9e9e9",
                    color: isCurrentUser ? "#fff" : "#000",
                    wordWrap: "break-word",
                    lineHeight: "1.4"
                  }}
                >
                  {msg.message}
                </div>
                <span style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
            );
          })}
          <div ref={endRef} />
        </>
      )}
    </div>
  );
}

export default MessageList;
