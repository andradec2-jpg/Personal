# Messenger Application
A real-time messaging application built with React, Express, MongoDB, JWT authentication, and Socket.IO.
## Overview
Messenger is a multi-user messaging platform that supports:
- User account creation
- User authentication
- Direct conversations
- Group conversations
- Real-time message delivery
- Offline message recovery
- Persistent message history
- Authorization-based access control
The system is designed so that only participants in a conversation can view messages, send messages, or receive 
real-time events for that conversation.
---
## Features
### Authentication
- Account registration
- Login
- Logout
- Password hashing with bcrypt
- JWT-based authentication
### Conversations
- Direct conversations between two users
- Group conversations with multiple users
- Direct conversation deduplication
- Real-time conversation creation updates
### Messaging
- Real-time messaging with Socket.IO
- Persistent message storage in MongoDB
- Offline message recovery
- Automatic conversation history loading
### Authorization
- Conversation membership validation
- Unauthorized users cannot:
  - View messages
  - Send messages
  - Join conversation sockets
  - Receive conversation events
---
## Technology Stack
### Frontend
- React
- Vite
- Socket.IO Client
### Backend
- Express
- Socket.IO
- JWT
- bcrypt
### Database
- MongoDB
- Mongoose
---
## Project Structure
```text
client/
└── src/
server/
├── auth/
├── conversations/
├── middleware/
├── models/
├── realtime/
└── routes/
docs/
├── requirements.md
├── implementation-report.md
├── verification.md
└── diagrams/
```
---
## Installation
### Install Backend Dependencies
From the project root:
```bash
npm install
```
### Install Frontend Dependencies
```bash
cd client
npm install
```
---
## Environment Configuration
Create:
```text
.env.local
```
Example:
```env
JWT_SECRET=REPLACE_WITH_64_CHAR_SECRET
MONGODB_URI=mongodb://127.0.0.1:27017/messenger
```
---
## Starting MongoDB
```bash
docker compose up -d mongodb
```
Verify:
```bash
docker compose ps
```
---
## Running the Backend
From the project root:
```bash
npm run local
```
Expected:
```text
Listening on http://127.0.0.1:3000
```
---
## Running the Frontend
```bash
cd client
npm run dev
```
Expected:
```text
http://127.0.0.1:5173
```
---
## Creating Accounts
Accounts can be created directly from the login screen.
1. Select Create Account
2. Enter:
   - Username
   - Password
   - Confirm Password
3. Click Create Account
The user is automatically logged in after successful registration.
---
## Creating Conversations
### Direct Conversation
1. Click + New
2. Select Direct Message
3. Choose a user
4. Click Create Direct Message
If a direct conversation between both users already exists, the existing conversation is opened instead of creating a 
duplicate.
### Group Conversation
1. Click + New
2. Select Group Chat
3. Enter a group name
4. Select participants
5. Click Create Group Chat
---
## Running Automated Tests
From the project root:
```bash
npm test
```
The automated test suite verifies:
- Token validation
- Authentication
- Authorization
- Message validation
- Socket authentication
- Persistence
- Conversation creation
---
## Verified Behaviors
The application has been verified to support:
- Direct messaging
- Group messaging
- Real-time delivery
- Offline recovery
- Persistence after backend restart
- Direct conversation reuse
- Authorization enforcement
- Real-time conversation appearance
---
## Known Limitations
- No profile pictures
- No typing indicators
- No read receipts
- No online/offline presence indicators
These features were not required for the project objectives.
---
## Author
Caitlyn Andrade
## Course Artifact
IA-06: Messenger Implementation and Verification

