# IA-06 Implementation Report
## Project Overview
Messenger is a real-time messaging application that allows authenticated users to communicate through direct 
conversations and group conversations.
The system provides:
- User registration
- User authentication
- Direct messaging
- Group conversations
- Real-time message delivery
- Offline message recovery
- Persistent message history
- Authorization-based access control
The application uses a React frontend, Express backend, MongoDB persistence layer, Socket.IO for real-time 
communication, JWT authentication, and bcrypt password hashing.
---
# System Architecture
## Frontend
### Technologies
- React
- Vite
- Socket.IO Client
### Major Components
| Component | Responsibility |
|------------|------------|
| App.jsx | Session management and application state |
| LoginForm.jsx | Login and account registration |
| ConversationList.jsx | Conversation sidebar display |
| ConversationPanel.jsx | Conversation view and messaging |
| MessageList.jsx | Message rendering |
| CreateConversationForm.jsx | Direct and group conversation creation |
---
## Backend
### Technologies
- Express
- Socket.IO
- MongoDB
- Mongoose
- bcrypt
- JWT
### Major Components
| File | Responsibility |
|--------|--------|
| auth.js | Registration and login |
| conversations.js | Conversation and messaging APIs |
| conversationSockets.js | Real-time communication |
| Conversation.js | Conversation model |
| Message.js | Message model |
| PrimerUser.js | User model |
| pairKey.js | Direct conversation deduplication |
---
# Database Design
## User Model
The User model stores:
- Username
- Password hash
Passwords are never stored in plaintext.
Password hashing is performed using bcrypt.
---
## Conversation Model
The Conversation model supports both direct and group conversations.
### Fields
- type
- title
- createdBy
- members
- pairKey
### Conversation Types
#### Direct Conversation
Represents communication between exactly two users.
#### Group Conversation
Represents communication between multiple users.
### Direct Conversation Deduplication
The implementation uses a canonical pair key:
```text
Alice + Bob
```
and
```text
Bob + Alice
```
resolve to the same value.
This prevents duplicate direct conversations from being created.
---
## Message Model
The Message model stores conversation messages.
### Fields
- conversation
- sender
- body
- createdAt
Messages are persisted before being delivered to connected users.
---
# Authentication
## Registration
Endpoint:
```http
POST /api/auth/register
```
Features:
- Username validation
- Password validation
- Duplicate username prevention
- bcrypt password hashing
---
## Login
Endpoint:
```http
POST /api/auth/login
```
Successful login returns:
```json
{
  "token": "...",
  "user": {
	"id": "...",
	"username": "..."
  }
}
```
JWT tokens are used for:
- API authentication
- Socket.IO authentication
---
# Authorization
Authorization is enforced at the conversation level.
Users must be members of a conversation in order to:
- View conversation history
- Send messages
- Join conversation sockets
- Receive conversation updates
Unauthorized users are denied access to protected conversations.
---
# Direct Conversations
Direct conversations can be created through:
```http
POST /api/conversations/direct
```
Features:
- One conversation per user pair
- Conversation reuse
- Duplicate prevention
Example:
```text
Alice creates conversation with Bob
```
Later:
```text
Bob creates conversation with Alice
```
The existing conversation is reused instead of creating a duplicate.
---
# Group Conversations
Group conversations can be created through:
```http
POST /api/conversations/group
```
Features:
- Multi-user communication
- Custom conversation titles
- Persistent history
- Real-time appearance for members
Examples:
```text
Capstone Team
Team 1
Team 2
```
---
# Real-Time Communication
Socket.IO is used for real-time functionality.
### Events
#### conversation:join
Joins a conversation room after authorization.
#### conversation:new
Notifies members of newly created conversations.
#### message:send
Validates and persists a message.
#### message:new
Delivers a new message to conversation participants.
#### conversation:leave
Leaves an active conversation room.
---
# Message Delivery Workflow
Messages follow this workflow:
```text
Validate
Authorize
Persist
Acknowledge
Broadcast
```
Messages are always persisted before delivery.
This prevents message loss and allows offline recovery.
---
# Offline Recovery
Offline recovery is implemented using persistent message storage.
Workflow:
```text
User disconnects
Messages are sent
Messages are stored
User reconnects
History reloads
Messages appear
```
This allows users to recover missed messages without relying on Socket.IO replay.
---
# Frontend Enhancements
Additional features were implemented beyond the original primer baseline.
Examples include:
- Account creation from the login screen
- Direct conversation creation from the UI
- Group conversation creation from the UI
- Real-time conversation appearance
- Messenger-style sidebar layout
- Scrollable message history
- Automatic scrolling to newest messages
- Human-readable conversation names
- Human-readable sender names
---
# Security Considerations
The application implements:
- bcrypt password hashing
- JWT authentication
- Conversation-level authorization
- Protected Socket.IO connections
- Membership validation
- Server-side input validation
- Direct conversation deduplication
Passwords are never stored in plaintext.
---
# Requirement Traceability Matrix
| Requirement | Implementation | Verification |
|------------|------------|------------|
| User Registration | auth.js | Registration test passed |
| User Login | auth.js | Login test passed |
| Direct Conversation Creation | conversations.js | Alice/Bob direct conversation test |
| Direct Conversation Deduplication | pairKey.js | Existing conversation reused |
| Group Conversation Creation | conversations.js | Group creation test passed |
| Message Persistence | Message.js | Messages survive restart |
| Real-Time Messaging | conversationSockets.js | Live Alice ↔ Bob messaging |
| Conversation Authorization | memberConversation() | Carol denied access |
| Offline Recovery | ConversationPanel.jsx | Offline recovery test passed |
| Account Creation UI | LoginForm.jsx | Browser verification passed |
| Conversation Creation UI | CreateConversationForm.jsx | Browser verification passed |
| Messenger Layout | App.jsx | Browser verification passed |
---
# Conclusion
The Messenger application successfully implements:
- Secure authentication
- User account creation
- Direct messaging
- Group conversations
- Direct conversation deduplication
- Real-time messaging
- Persistent message history
- Offline recovery
- Authorization controls
- Real-time conversation creation
The completed implementation satisfies the IA-06 Messenger implementation requirements and provides a fully functional 
multi-user messaging platform.
