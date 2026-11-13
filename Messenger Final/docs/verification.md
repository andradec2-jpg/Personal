# Verification Report
## Overview
The Messenger application was verified through a combination of:
- Automated testing
- Browser-based functional testing
- Multi-user verification
- Authorization testing
- Persistence testing
- Real-time messaging testing
Testing was performed using multiple user accounts to verify authentication, authorization, direct conversations, 
group conversations, persistence, and real-time communication. 
---
# Test Environment
## Backend
Technology Stack:
- Express
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
## Frontend
Technology Stack:
- React
- Vite
- Socket.IO Client
## Test Accounts
The following accounts were used during verification:
```text
alice
bob
carol
```
Additional accounts were created through the registration interface to verify account creation functionality.
---
# Automated Testing
## Authentication Tests
### Verify JWT Generation
Purpose:
Ensure issued tokens can be validated.
Expected Result:
Token verifies successfully.
Actual Result:
Pass
Status:
✅ PASS
---
### Verify Tampered JWT Rejection
Purpose:
Ensure modified tokens are rejected.
Expected Result:
Token validation fails.
Actual Result:
Pass
Status:
✅ PASS
---
## Authorization Tests
### Anonymous Conversation Access
Purpose:
Verify protected resources require authentication.
Expected Result:
HTTP 401 Unauthorized
Actual Result:
401 Unauthorized returned.
Status:
✅ PASS
---
### Protected Conversation Lookup
Purpose:
Verify protected conversation routes reject anonymous access.
Expected Result:
HTTP 401 Unauthorized
Actual Result:
401 Unauthorized returned.
Status:
✅ PASS
---
## Message Validation Tests
### Empty Message Rejection
Purpose:
Ensure empty messages are not accepted.
Expected Result:
Message rejected.
Actual Result:
Message rejected.
Status:
✅ PASS
---
### Whitespace Message Rejection
Purpose:
Ensure whitespace-only messages are not accepted.
Expected Result:
Message rejected.
Actual Result:
Message rejected.
Status:
✅ PASS
---
### Oversized Message Rejection
Purpose:
Ensure messages exceeding the allowed size are rejected.
Expected Result:
Message rejected.
Actual Result:
Message rejected.
Status:
✅ PASS
---
## Direct Conversation Deduplication Test
Purpose:
Verify duplicate direct conversations cannot be created.
Procedure:
1. Alice creates a conversation with Bob.
2. Bob creates a conversation with Alice.
Expected Result:
Existing conversation is reused.
Actual Result:
Same conversation identifier returned.
Status:
✅ PASS
---
## Socket Authentication Test
Purpose:
Verify invalid socket credentials are rejected.
Expected Result:
Connection rejected.
Actual Result:
Connection rejected.
Status:
✅ PASS
---
# Functional Testing
## Test 1 – User Registration
### Procedure
1. Open Messenger.
2. Select Create Account.
3. Enter:
   - Username
   - Password
   - Confirm Password
4. Submit registration.
### Expected Result
User is created and automatically logged in.
### Actual Result
User successfully created and logged in.
### Status
✅ PASS
---
## Test 2 – User Login
### Procedure
1. Enter valid credentials.
2. Submit login form.
### Expected Result
Authenticated session begins.
### Actual Result
User successfully logged in.
### Status
✅ PASS
---
## Test 3 – Direct Conversation Creation
### Procedure
1. Login as Alice.
2. Select New Conversation.
3. Select Bob.
4. Create direct conversation.
### Expected Result
Conversation created and opened.
### Actual Result
Conversation created and opened.
### Status
✅ PASS
---
## Test 4 – Direct Conversation Deduplication
### Procedure
1. Alice creates a conversation with Bob.
2. Bob attempts to create a conversation with Alice.
### Expected Result
Existing conversation is reused.
### Actual Result
Existing conversation opened.
### Status
✅ PASS
---
## Test 5 – Group Conversation Creation
### Procedure
1. Login as Alice.
2. Create:
   - Group name: Capstone Team
   - Members: Bob, Carol
### Expected Result
Group conversation created.
### Actual Result
Group conversation created.
### Status
✅ PASS
---
## Test 6 – Real-Time Conversation Appearance
### Procedure
1. Alice creates a new conversation.
2. Bob remains logged in.
### Expected Result
Conversation appears in Bob's sidebar without refresh.
### Actual Result
Conversation appears immediately.
### Status
✅ PASS
---
# Messaging Verification
## Test 7 – Alice Sends Message To Bob
### Procedure
1. Open the same conversation in both browsers.
2. Alice sends a message.
### Expected Result
Message appears immediately for Bob.
### Actual Result
Message delivered immediately.
### Status
✅ PASS
---
## Test 8 – Bob Sends Message To Alice
### Procedure
1. Bob sends a message.
### Expected Result
Message appears immediately for Alice.
### Actual Result
Message delivered immediately.
### Status
✅ PASS
---
## Test 9 – Group Messaging
### Procedure
1. Open group conversation.
2. Alice sends a message.
3. Bob sends a message.
4. Carol sends a message.
### Expected Result
Messages appear for all participants.
### Actual Result
Messages delivered to all members.
### Status
✅ PASS
---
# Authorization Verification
## Test 10 – Unauthorized Message History Access
### Procedure
1. Login as Carol.
2. Attempt to access an Alice/Bob private conversation.
### Expected Result
Access denied.
### Actual Result
Access denied.
### Status
✅ PASS
---
## Test 11 – Unauthorized Message Sending
### Procedure
1. Login as Carol.
2. Attempt to send a message into an Alice/Bob private conversation.
### Expected Result
Message rejected.
### Actual Result
Message rejected.
### Status
✅ PASS
---
## Test 12 – Unauthorized Socket Join
### Procedure
1. Login as Carol.
2. Attempt to join Alice/Bob conversation socket.
### Expected Result
Socket join denied.
### Actual Result
Socket join denied.
### Status
✅ PASS
---
# Recovery Verification
## Test 13 – Offline Recovery
### Procedure
1. Bob disconnects.
2. Alice sends messages.
3. Bob reconnects.
### Expected Result
Missed messages appear from stored history.
### Actual Result
Messages recovered successfully.
### Status
✅ PASS
---
# Persistence Verification
## Test 14 – Backend Restart Persistence
### Procedure
1. Send messages.
2. Stop backend.
3. Restart backend.
4. Login again.
### Expected Result
Message history remains available.
### Actual Result
All messages remained available.
### Status
✅ PASS
---
# Final Results
| Feature | Result |
|----------|---------|
| Account Creation | ✅ PASS |
| Login | ✅ PASS |
| Direct Conversations | ✅ PASS |
| Direct Conversation Deduplication | ✅ PASS |
| Group Conversations | ✅ PASS |
| Real-Time Messaging | ✅ PASS |
| Real-Time Conversation Updates | ✅ PASS |
| Authorization | ✅ PASS |
| Offline Recovery | ✅ PASS |
| Persistence After Restart | ✅ PASS |
| Socket Authentication | ✅ PASS |
| Message Validation | ✅ PASS |
---
# Conclusion
All functional requirements were successfully implemented and verified.
The Messenger application supports:
- Secure authentication
- User registration
- Direct conversations
- Group conversations
- Direct conversation deduplication
- Real-time messaging
- Persistent message history
- Offline recovery
- Authorization enforcement
- Real-time conversation updates
The system satisfies the implementation and verification objectives of IA-06 and was verified through both automated 
and manual testing.
