# Ethics Reflection

## Messenger

## 1. Design Impact Analysis

### 1.1 Cultural Impact

#### Positive Impacts

- Messenger enables communication among diverse groups, supporting cultural exchange and community building
- Group messaging can strengthen shared cultural identities by giving communities a space to organize and communicate.

#### Negative Impacts

- Cultural misunderstandings or conflicts may escalate without moderation tools.
- Certain groups may use Messenger to exclude others or reinforce harmful cultural biases.

#### Mitigations

- Provide clear community guidelines (operational policy).
- Add optional reporting mechanisms for harmful behavior in future iterations.

---

### 1.2 Economic Impact

#### Positive Impacts

- Messenger can support collaboration among small teams or student groups without requiring paid commercial tools.
- Lightweight design reduces infrastructure costs.

#### Negative Impacts

- If Messenger becomes relied upon for coordination, outages could disrupt work or academic activites
- Lack of advanced moderation could allow spam or scams in group spaces.

#### Mitigations

- Reliability requirements (NFR-03, NFR-04) ensure message persistence and meaningful error handling
- Future versions could include basic rate-limiting or spam detection. 

---

### 1.3 Environmental Impact

#### Positive Impacts

- Lightweight architecture minimizes server load compared to large commercial platforms.
- Limited feature scope reduces energy consumption

#### Negative Impacts

- Any online system contributes to energy use through hosting and data storage.
- Persistent message storage increases long-term storage requirements.

#### Mitigations

- Implement message retention policies (operational policy).
- Optimize storage schemas to reduce unnecessary duplication.

---

### 1.4 Global Impact

#### Positive Impacts

- Messenger can support communication across geographic boundaries.
- Simple design makes it accessible in environments with limited bandwidth.

#### Negative Impacts

- Cultural norms around communication vary globally; features may not meet expectations in all regions.
- Without localization, the system may be less usable for non-English speakers.

#### Mitigations

- Document internationalization as an out-of-scope feature but note it as a future enhancement.
- Keep UI text simple and clear to reduce language barriers.

---

### 1.5 Public Health Impact

#### Positive Impacts

- Messenger can support mental well-being by enabling social connection.
- Group messaging can help coordinate health-related community efforts.

#### Negative Impacts

- Excessive use may contribute to screen fatigue or stress.
- Conflicts in group chats may negatively affect emotional well-being,

#### Mitigations

- Provide optional notification controls (future enhancement).
- Encourage healthy usage through operational guidelines.

---

### 1.6 Public Safety Impact

#### Positive Impacts

- Messenger can support coordination during emergencies or local events.
- Group messaging enables rapid dissemination of important information.

#### Negative Impacts

- Misinformation could spread quickly in group chats.
- Lack of moderation tools may allow harmful content,

#### Mitigations

- Add a requirement for meaningful error messages (NFR-04) to prevent silent failures
- Future versions could include message reporting or admin oversight. 

---

### 1.7 Public Welfare Impact

#### Positive Impacts

- Messenger supports community building and social networks
- Provides a free communication option for users who cannot afford commercial tools

#### Negative Impacts

- Exclusionary group behavior may harm vulnerable users.
- Without accessibility features, some users may be unable to participate fully.

#### Mitigations

- Keep UI simple and readable.
- Document accessibility considerations for future development.

---

### 1.8 Social Impact

#### Positive Impacts

- Messenger strangthens interpersonal relationships through private messaging. 
- Group messaging supports collaboration, shared interests, and community engagement.

#### Negative Impacts

- Social conflicts may escalate without moderation.
- Users may feel pressured to respond quickly or stay constantly connected.

#### Mitigations

- Provide clear operational guidelines for respectful communication.
- Add notification controls in furture versions.

---
 
## 2. Connecting Ethics to Engineering

### 2.1 Impact: Misinformation or Harmful Content in Group Chats

#### Who is Affected

- Group members
- Vulnerable users
- Community organizers relying on accurate information

#### Potential Harm

- Spread of false information
- Emotional distress
- Poor decision-making during emergencies

#### Realistic Mitigation

Introduce a **reporting mechanism** allowing users to flag harmful content for administrator review. 

#### Engineering Influence

- This mitigation affects **requirements** and **operational policy**.
- It suggests adding a future requirement such as:
  **FR-16 - The system shall allow users to report harmful or inappropriate messages to administrators.**

#### Traceability

This mitigation aligns with concerns discovered in IA-04's sequence diagram analysis, where failure paths and 
membership validation exposed moderation gaps.

### 2.2 Impact: Unauthorized Group Messaging

#### Who is Affected

- Group members
- System administrators
- Users attempting to send messages without proper membership

#### Potential Harm

- Confusion or disruption in group communication
- Potential harassment if unauthorized users send messages
- Loss of trust in the system

#### Realistic Mitigation

Enforce strict membership validation before message delivery (already present in FR-08, FR-10).

#### Engineering Influence

- This mitigation directly influences **design decisions** and **acceptance criteria.**
- It reinforces the need for:
	- **FR-08** (join group)
	- **FR-10** (deliver group messages only to members)
	- **NFR-04** *meaningful error handling)

#### Traceabiliy

The sequence diagram explicitly models this failure path, demonstrating how ethical concerns map to runtime behavior.

---
 
## 3. AI Assisted Work

I used AI to assist in creating the PlantUML diagrams in IA-04 because I am not familiar with tool. Even with this
assistance I had to be heavily involved with the process to ensure it produced a diagram I was happy with. This was 
especially applicable when creating the data flow diagram. The initial diagram produced was all over the place and
not pleasing to look at. I rejected this diagram and it took multiple iterations and even switching AI systems to 
produce one I was happier with. 

