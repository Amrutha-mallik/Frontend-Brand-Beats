// src/components/chat/MessageInput.jsx
import { useState } from "react";

function MessageInput({ socket, projectId, userId, otherUserId, setMessages, userRole }) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    if (!text.trim() || !socket || !projectId) return;

    const messageText = text.trim();
    setIsSending(true);
    setText(""); // Clear input immediately

    // Create optimistic message to show immediately on the right
    const optimisticMessage = {
      _id: `temp_${Date.now()}`,
      projectId,
      senderId: userId,
      receiverId: otherUserId,
      message: messageText,
      createdAt: new Date().toISOString(),
      pending: true
    };

    // Add message to UI immediately
    setMessages((prev) => [...prev, optimisticMessage]);

    // Emit message to server
    console.log("Emitting message:", messageText);
    socket.emit("sendMessage", {
      projectId,
      senderId: userId,
      receiverId: otherUserId || null, // Let backend determine if null
      message: messageText,
      userRole: userRole
    }, (response) => {
      console.log("Message callback response:", response);
      // Handle callback if server sends one
      if (response?.success) {
        console.log("Message confirmed by server with ID:", response.messageId);
        // Update the pending message with actual ID
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === optimisticMessage._id
              ? { ...msg, _id: response.messageId || msg._id, pending: false }
              : msg
          )
        );
      } else if (response?.error) {
        console.error("Failed to send message", response.error);
        // Remove the optimistic message on error
        setMessages((prev) => prev.filter((msg) => msg._id !== optimisticMessage._id));
        setText(messageText); // Restore message on error
      }
    });

    // Clear sending state after a short delay (message is already in UI)
    setTimeout(() => {
      setIsSending(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ display: "flex", padding: "12px 16px", borderTop: "1px solid #ddd", background: "#fff", gap: "8px", alignItems: "flex-end" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message... (Shift+Enter for new line)"
        disabled={isSending}
        rows="1"
        style={{ 
          flex: 1, 
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "14px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          outline: "none",
          transition: "border-color 0.2s",
          resize: "none",
          maxHeight: "100px"
        }}
        onFocus={(e) => e.target.style.borderColor = "#0b87c1"}
        onBlur={(e) => e.target.style.borderColor = "#ddd"}
      />
      <button 
        onClick={sendMessage} 
        disabled={isSending || !text.trim()}
        style={{ 
          padding: "10px 24px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: isSending || !text.trim() ? "#ccc" : "#0b87c1",
          color: "white",
          cursor: isSending || !text.trim() ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "14px",
          transition: "background-color 0.2s",
          whiteSpace: "nowrap"
        }}
        onMouseEnter={(e) => !isSending && text.trim() && (e.target.style.backgroundColor = "#0a6fa0")}
        onMouseLeave={(e) => !isSending && text.trim() && (e.target.style.backgroundColor = "#0b87c1")}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default MessageInput;
