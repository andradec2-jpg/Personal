# Diagram Analysis

## Messenger

## 1. Data Flow Diagram Analysis

### Engineering Question Answered

The DFD answers:
**Where does information come from, where does it go, what transforms it, and what must persist?**

It clarifies the movement of authentication data, private messages, group messages, and membership updates across 
processes and data stores. 

### Requirements Represented 

- **FR-01 - FR-03** (registration & authentication)
- **FR-04 - FR-06** (private messaging)
- **FR-07 - FR13** (group messaging & membership)
- **FR-14 - FR-15** (admin actions)
- **NFR-03** (persistent storage)

### Design Responsibilities Revealed

- The **authentication process** is clearly separated from messaging processes, reinforcing security boundaries.
- The **Messages Store** must support both private and group messages, implying a unified schema or tagged storage.
- The **Group Store** must maintain membership lists, which become a dependency for message delivery.

### Ambiguity or Missing Requirement Discovered

While modeling, one ambiguity became clear:
**The requirements do not specify how message delivery failures should be handled** (e.g., storage unavailable,
user offline).
This suggests adding or refining a non-functional reliability requirement (e.g., NFR-04) and possibly acceptance 
criteria for error handling.

---

## 2. Sequence Diagram Analysis

### Engineering Question Answered

The sequence diagram answers:
**Who communicates with whom, in what order, and what happens when the scenario does not follow the ideal path?**

It exposes the runtime behavior of sending a group message and the system's response when membership validation 
fails.

### Requirements Represented

- **FR-09 -** send group message
- **FR-10 -** deliver to group members
- **FR-11 -** store group messages
- **FR-08/FR-12 -** membership affects message permissions
- **NFR-04 -** meaningful error handling

### Design Responsibilities Revealed

- The backend must **validate membership before storing or delivering messages.**
- The UI must **surface backend errors** in a user-understandable way.
- The backend must **coordinate two data stores** (Group Store and Messages Store) in a single operation

### Ambiguity or Missing Requirement Discovered

The diagram exposes a missing detail:
**Should group creators or admins have special privileges (e.g., sending messages even if removed)?**

This is already listed as an unresolved question in IA-03, and the diagram reinforces that this ambiguity affects 
runtime behavior.
It may require adding a requirement such as:

FR-16 - The system shall define and enforce group-level permissions for creators or administrators.
