# Requirements Engineering

## Messenger

## 1. System Context

Messenger is a communication system that enables registered users to exchange private messages and participate
in group-based conversations. The system boundary includes:

- **Messenger Application -** the core system being engineered
- **Actors/External Entities:**
	- **Registered User -** sends and receives private and group messages.
	- **System Administrator -** manages user accounts and group membership
	- **Authentication Service -** external or internal module that verifies user credentials.
	- **Persistent Storage -** stores user accounts, groups, and messages.

---

## 2. Functional Requirements

### User Accounts & Authentication

- **FR-01 -** The system shall allow a new user to register by providing required account information.
*Traceability:* Project objective; required for all messaging behavior.
- **FR-02 -** The system shall authenticate users before granting access to messaging features. 
*Traceability:* Security constraint; prevents unauthorized access. 
- **FR-03 -** The system shall allow authenticated users to log out.
*Traceability:* Basic session management.

### Private Messaging

- **FR-04 -** The system shall allow a user to send a private message to another registered user. 
*Traceability:* Core project objective (private messaging).
- **FR-05 -** The system shall deliver private messages to the intended recipient. 
*Traceability:* Core messaging behavior.
- **FR-06 -** The system shall store private messages persistently
*Traceability:* Requirement for mesage history and reliability.

### Group Messaging

- **FR-07 -** The system shall allow users to create a group conversation.
*Traceability:* In-scope capability.
- **FR-08 -** The system shall allow users to join an existing group.
*Traceability:* Group participation requirement.
- **FR-09 -** The system shall allow users to send messages to a group.
*Traceability:* Core project objective (group messaging).
- **FR-10 -** The system shall deliver group messages to all current group members. 
*Traceability:* Group communication behavior.
- **FR-11 -** The system shall store group messages persistently.
*Traceability:* Reliability and message history.

### Group Membership Management

- **FR-12 -** The system shall allow users to leave a group.
*Traceability:* Basic group lifecycle behavior.
- **FR-13 -** The system shall allow users to view the list of current group members.
*Traceablity:* Transparency and usability.

### Administrative Functions

- **FR-14 -** The system shall allow administrators to deactivate user accounts.
*Traceability:* Operational policy and system maintenance.
- **FR-15 -** The system shall allow administrators to remove groups.
*Traceability:* System hygiene and management.

---

## 3. Non-functional requirements

### Security

- **NFR-01 -** The system shall protect user credentials using secure hashing.
- **NFR-02 -** The system shall restrict messaging features to authenticated users only.

### Reliability

- **NFR-03 -** The system shall preserve messages in persistent storage such that no message is lost during normal
operation.
- **NFR-04 -** The system shall handle unexpected failures (e.g., storage unavailability) by returning a
 meaningful error to the user.

### Performance

- **NFR-05 -** The system shall deliver private and group messages within **2 seconds** under normal load.

### Usability

- **NFR-06 -** The interface shall clearly distinguish private conversations from group conversations.
- **NFR-07 -** The system shall provide visible confirmation when a message is successfully sent.

### Constraints

- **NFR-08 -** The system shall be ready for final delivery no later than **November 2, 2026.**
- **NFR-09 -** The system shall operate in a standard desktop or web environment without requiring mobile support.

---

## 4. Acceptance Criteria

### FR-04 - Send Private Message

- A user selects another registered user.
- The user enters a message and submits it.
- The system stores the message and confirms successful delivery.
- The recipient can view the message in their private conversation history.

### FR-09 - Send a Group Message

- A user selects a group they belong to.
- The user enters a message and submits it.
- The system stores the message and delivers it to all current group members.
- All members can view the message in the group conversation history.

### FR-01 - User Registration

- A user provides required information.
- The system validates the input.
- The system creates a new account and confirms registration.
- The user can subsequently authenticate using the provided credentials.

### NFR-05 - Message Delivery Performance

- During normal operation, 95% of messages are delivered within 2 seconds
- Performance is measured using timestamp logs during testing.

---

## 5. Assumptions and Unresolved Questions

### Assumptions

- Users will not generate extremely high message volume.
- The system will run in a controlled environment suitable for a course project.
- Basic secure transport (HTTPS or equivalent) is available

### Unresolved Questions

- Should administrators be abl eot read private messages for moderation purposes?
- Should group creators have special privileges (E.g., removing members)?
- Should deleted accounts retain message history or anonymize it?
- Should the system support mesage editing or deletion?

---

## 6. Traceability

Each requirement is traceable to:

- **Project objectives** (private messaging, group messaging).
- **Scope decisions** (in-scope vs. out-of-scope functionality).
- **Stakeholder needs** (users, administrators).
- **Constraints** (November 2 deadline, repository submission rules).
- **Engineering decisions** (persistent storage, authenticaiton).

Examples:

- **FR-04** (privatie mesaging) -> directly traceable to the project objective: "allow private messages between
 users."
- **FR-09** (group messaging) -> traceable to the objective: "group-based messaging involving multiple users."
- **NFR-08** -> traceable to the explicit course constraint: November 2 final delivery deadline.
- **FR-06/FR11** -> traceable to reliability expectations and the need for persistent message history.
