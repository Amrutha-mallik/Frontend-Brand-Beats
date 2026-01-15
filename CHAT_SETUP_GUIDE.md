# Chat System Setup Guide

## Frontend Changes Made

The following improvements have been implemented in your chat components:

### 1. **Socket.jsx** - Proper Authentication & Connection
- Added `initializeSocket()` function that authenticates with backend using JWT token
- Token is sent in socket auth header: `auth: { token: token }`
- Proper reconnection configuration for reliable connections
- Exports `getSocket()` to retrieve existing socket instance

### 2. **ChatPage.jsx** - Project-Specific Rooms
- Socket instance is properly initialized on component mount
- Joins room with: `projectId` and `userId` to track who's in the room
- Loads chat history from `/chats/{projectId}` endpoint (persists across login/logout)
- Only loads messages for the current project

### 3. **ChatWindow.jsx** - Room Isolation
- Only processes messages belonging to current project: `msg.projectId === projectId`
- Prevents duplicate messages using `_id` check
- Proper cleanup of event listeners

### 4. **MessageInput.jsx** - Enhanced Features
- Includes `senderId` in message payload for authentication
- Enter key support for sending messages
- Disabled state while sending
- Server acknowledgment handling via callback

---

## Backend Socket.io Configuration Required

Your backend must handle the following socket events:

### **Server-side Socket Events to Implement:**

```javascript
// Authenticate user when connecting
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Verify JWT token
  const user = verifyToken(token);
  socket.userId = user.id;
  socket.userRole = user.role;
  next();
});

// Handle room joining
socket.on("joinRoom", ({ projectId, userId }) => {
  // IMPORTANT: Verify that userId is assigned to this project
  // (Check if producer is assigned to project, or if user is the brand)
  
  const isAuthorized = checkIfUserCanAccessProject(userId, projectId);
  if (!isAuthorized) {
    socket.emit("error", { message: "Unauthorized access" });
    return;
  }
  
  socket.join(`project-${projectId}`);
  console.log(`User ${userId} joined room project-${projectId}`);
});

// Handle sending messages
socket.on("sendMessage", ({ projectId, senderId, receiverId, message }, callback) => {
  // Verify sender owns the message
  if (socket.userId !== senderId) {
    callback({ success: false, error: "Unauthorized" });
    return;
  }
  
  // Verify project access
  const isAuthorized = checkIfUserCanAccessProject(senderId, projectId);
  if (!isAuthorized) {
    callback({ success: false, error: "Unauthorized" });
    return;
  }
  
  // Save to database
  const newMessage = {
    projectId,
    senderId,
    receiverId,
    message,
    timestamp: new Date(),
    _id: generateId()
  };
  
  saveMessageToDatabase(newMessage);
  
  // Broadcast only to this project's room
  io.to(`project-${projectId}`).emit("receiveMessage", newMessage);
  
  // Send callback acknowledgment
  callback({ success: true });
});

// Handle disconnect
socket.on("disconnect", () => {
  console.log(`User ${socket.userId} disconnected`);
});
```

---

## Database Schema for Messages

```javascript
// Messages collection
{
  _id: ObjectId,
  projectId: String,        // Project ID
  senderId: String,         // User ID who sent
  receiverId: String,       // User ID who receives
  message: String,          // Message content
  timestamp: Date,          // When sent
  read: Boolean,            // Read status (optional)
  createdAt: Date
}

// Project collection (add assignedProducer)
{
  _id: ObjectId,
  title: String,
  brandId: String,          // Brand/Owner
  assignedProducerId: String, // Only this producer can chat
  status: String,
  // ... other fields
}
```

---

## API Endpoints Required

### `GET /chats/{projectId}`
**Purpose**: Load chat history when page loads

**Request Headers**:
```
Authorization: <jwt_token>
```

**Response**:
```javascript
[
  {
    _id: "msg1",
    projectId: "proj123",
    senderId: "user1",
    receiverId: "user2",
    message: "Hello!",
    timestamp: "2024-01-13T10:30:00Z"
  },
  // ... more messages
]
```

**Important**: Server must verify the user is authorized to access this project's messages

---

## Security Checklist

- ✅ Frontend sends JWT token in socket connection
- ✅ Backend verifies JWT token on socket connection
- ✅ Backend verifies user is assigned to project before allowing room join
- ✅ Backend prevents viewing other producers' chats (only assigned producer can chat)
- ✅ Database stores messages with projectId for persistence
- ✅ Each project has isolated room: `project-{projectId}`
- ✅ Messages loaded from database on page refresh/login

---

## Usage in Your Components

### Integrating with Brands/Producers Pages

```jsx
// In your Brands/MyProject.jsx or Producers components
import ChatPage from "./chats/ChatPage";

// When showing a project with assigned producer:
<ChatPage 
  projectId={project._id}
  userId={currentUser._id}  // Brand or assigned Producer
  otherUserId={assignedProducerId || brandId}  // The other party
/>

// Important: Only show chat if:
// - For Brand: This is their project
// - For Producer: They are assigned to this project
```

### Checking Assignment Before Rendering Chat

```jsx
const CanAccessChat = ({ project, currentUser }) => {
  const isProducerAssigned = project.assignedProducerId === currentUser._id;
  const isBrand = project.brandId === currentUser._id;
  
  if (!isProducerAssigned && !isBrand) {
    return <div>Not authorized to chat</div>;
  }
  
  return (
    <ChatPage 
      projectId={project._id}
      userId={currentUser._id}
      otherUserId={isProducerAssigned ? project.brandId : project.assignedProducerId}
    />
  );
};
```

---

## Testing the Chat

1. **Test 1**: Brand creates project → assigns producer → Both can chat ✓
2. **Test 2**: Other producer tries to access → "Unauthorized" ✓
3. **Test 3**: Brand logs out → logs back in → old messages appear ✓
4. **Test 4**: Producer logs out → logs back in → old messages appear ✓
5. **Test 5**: Real-time message appears in both windows simultaneously ✓

