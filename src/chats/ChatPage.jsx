// src/pages/ChatPage.jsx
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { initializeSocket } from "./Socket"
import ChatWindow from "./ChatWindow"
import axios from "../config/a";
import UserContext from "../context/userContext";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const socketInitializedRef = useRef(false);
  
  const projectChatId = id;

  // Check if user has access to this project's chat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !projectChatId || !user?._id) {
      setHasAccess(false);
      return;
    }

    // Try to verify access by attempting to load chat history
    // If successful, user has access
    axios
      .get(`/chats/${projectChatId}`, {
        headers: { Authorization: token }
      })
      .then((res) => {
        console.log("Successfully loaded chat history - user has access");
        setHasAccess(true);
      })
      .catch((err) => {
        console.error("Failed to load chat history:", err.response?.status, err.message);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setErrorMessage("You don't have access to this project's chat. Only the brand owner and assigned producer can chat.");
        } else {
          setErrorMessage("Failed to verify chat access. Please try again.");
        }
        setHasAccess(false);
      });
  }, [projectChatId, user?._id]);

  // Initialize socket and join room (only if user has access)
  useEffect(() => {
    if (!user?._id || !projectChatId || socketInitializedRef.current || !hasAccess) return;

    socketInitializedRef.current = true;
    const socketInstance = initializeSocket();
    setSocket(socketInstance);

    // Join project-specific room
    console.log("Emitting joinRoom for project:", projectChatId, "user:", user._id);
    socketInstance.emit("joinRoom", { 
      projectId: projectChatId,
      userId: user._id,
      userRole: user.role
    }, (response) => {
      console.log("joinRoom response:", response);
      if (response?.success) {
        console.log("Successfully joined room");
      } else {
        console.error("Failed to join room:", response?.error);
        setHasAccess(false);
        setErrorMessage(response?.error || "Failed to join chat room");
      }
    });

    // Listen for room joined confirmation
    socketInstance.on("roomJoined", (data) => {
      console.log("Room joined successfully:", data);
    });

    socketInstance.on("accessDenied", (data) => {
      console.log("Access denied to room:", data);
      setHasAccess(false);
      setErrorMessage("Access denied: " + data);
    });

    return () => {
      socketInstance.off("joinRoom");
      socketInstance.off("roomJoined");
      socketInstance.off("accessDenied");
    };
  }, [projectChatId, user?._id, hasAccess]);

  // Load chat history - only if user has access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !projectChatId || !user?._id || !hasAccess) {
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log("Loading chat history for project:", projectChatId);
    
    axios
      .get(`/chats/${projectChatId}`, {
        headers: { Authorization: token }
      })
      .then((res) => {
        console.log("Loaded chat history - count:", res.data?.length || 0, "Messages:", res.data);
        const messagesData = Array.isArray(res.data) ? res.data : [];
        setMessages(messagesData);
        
        // Get the other user from chat history
        if (messagesData && messagesData.length > 0) {
          const firstMessage = messagesData[0];
          const otherUserId = firstMessage.senderId === user._id 
            ? firstMessage.receiverId 
            : firstMessage.senderId;
          setOtherUser(otherUserId);
          console.log("Other user identified:", otherUserId);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load chat history:", err.response?.status, err.response?.data || err.message);
        // If error, just continue without previous messages
        setMessages([]);
        setLoading(false);
      });
  }, [projectChatId, user?._id, hasAccess]);

  if (!hasAccess) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#d32f2f" }}>
        <h3>Access Denied</h3>
        <p>{errorMessage || "You don't have access to this chat"}</p>
      </div>
    );
  }

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading chat...</div>;
  }

  if (!socket || !user) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Initializing chat...</div>;
  }

  return (
    <ChatWindow
      socket={socket}
      messages={messages}
      setMessages={setMessages}
      projectId={projectChatId}
      userId={user._id}
      userRole={user.role}
      otherUserId={otherUser}
    />
  );
}

export default ChatPage;
