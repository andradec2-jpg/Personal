# Statement of Work

## Instrumentation and Evaluation for Human-AI Teaming in a Search-and-Rescue Game

> **Document status:** Draft  
> **Student:** Elizabeth Angelo  
> **Faculty mentor(s):** Nick Stiffler / Ngoc Nguyen  
> **Project period:** [Start Date] - [End Date]  
> **Expected effort:** 20 hours per week (summer)  
> **Version:** 0.1  
> **Last updated:** [Date]

---

## 1. Purpose

This Statement of Work (SOW) defines the research goals, technical scope, work plan, deliverables, and acceptance criteria for a student project investigating how an AI assistant can support human decision-making in time-sensitive tasks.

The project will use a simulated search-and-rescue scenario as its primary experimental setting. A human operator must locate and rescue victims while managing limited time, partial information, navigation demands, and potentially constrained resources. Successful rescues generate a reward, while elapsed time, failed actions, resource misuse, or missed victims generate costs. This structure provides a measurable environment in which to test whether an AI "oracle" improves human performance, when its assistance is useful, and when it may distract or mislead.

The work is intended as a research prototype and educational experience. It is not intended to produce a deployable emergency-response system or to make claims about operational search-and-rescue performance without further validation.

---

## 2. Background and Motivation

Interactive AI assistants such as Navi in *The Legend of Zelda* or Cortana in *Halo* provide context-sensitive information while a human remains responsible for acting. Modern machine learning makes it possible to study a more general version of this idea: an assistant that observes the state of a task, draws on prior experience, and provides timely recommendations to a human operator.

The central research question is:

> **To what extent can access to an AI oracle improve human performance in real-time decision-making tasks?**

Search-and-rescue is a useful experimental abstraction because it creates an explicit tension between reward and delay. The operator must decide where to search, which victim or objective to prioritize, when to change strategies, and whether to follow assistance. The environment can be instrumented to capture actions, state transitions, timing, recommendations, and outcomes.

The project will build a reproducible workflow that supports both technical development and controlled human-AI teaming experiments. It will include telemetry collection, an AI recommendation component, one or more game or testbed integrations, and an analysis pipeline.

---

## 3. Research Questions and Hypotheses

### 3.1 Primary research question

**RQ1.** Does access to an AI oracle improve human task performance relative to an equivalent condition without AI assistance?

### 3.2 Secondary research questions

- **RQ2.** Which forms of assistance are most beneficial: navigation guidance, prioritization, warnings, resource-management advice, or explanations?
- **RQ3.** How do recommendation timing, frequency, confidence, and presentation affect whether assistance helps or distracts?
- **RQ4.** How does the quality of the AI policy affect human trust, compliance, and performance?
- **RQ5.** When does AI assistance cause over-reliance, under-reliance, or slower decisions?
- **RQ6.** Can a model learned from prior gameplay provide benefits comparable to a privileged or scripted oracle?

### 3.3 Initial hypotheses

- **H1 - Assistance benefit:** Participants receiving useful AI assistance will achieve higher mission utility than participants receiving no assistance.
- **H2 - Time sensitivity:** The benefit of AI assistance will be greater when the task imposes stronger time pressure or higher information load.
- **H3 - Calibration:** Recommendations with calibrated confidence and an option to abstain will produce better outcomes than recommendations that always provide advice.
- **H4 - Quality dependence:** Incorrect, stale, or poorly timed recommendations may reduce performance below the no-assistance baseline.
- **H5 - Learned assistant:** A learned assistant will improve with additional experience, but may initially underperform a privileged or carefully scripted oracle.

The final hypotheses and primary outcome measure will be revised before formal data collection and documented in an experimental protocol or preregistration.

---

## 4. Project Objectives

By the end of the project, the student will:

1. Define a measurable search-and-rescue task with an explicit reward and cost function.
2. Evaluate candidate experimental platforms rather than assuming a platform in advance.
3. Implement reliable telemetry for human actions, game state, AI recommendations, and outcomes.
4. Develop at least one non-learned oracle baseline and one learned or data-driven AI assistant prototype.
5. Integrate the AI assistant with the selected experimental environment through a platform-independent interface.
6. Conduct pilot trials comparing assistance conditions.
7. Build a reproducible Python pipeline for validation, preprocessing, visualization, and statistical analysis.
8. Produce a research-style report, documented code, a deployment runbook, and a final presentation or poster.

---

## 5. Scope

### 5.1 In scope

- A literature and design review covering human-AI teaming, decision support, trust and reliance, mixed-initiative interaction, and evaluation of intelligent assistants.
- A short platform-selection study comparing the Cornell ASIST Lightweight Testbed with a custom environment implemented in Unity or Godot.
- A platform-independent event and recommendation schema.
- Collection of game state, user input, task events, recommendation events, and outcome metrics.
- Python code for data export, validation, preprocessing, model development, inference, and analysis.
- A scripted or privileged oracle that provides an upper-bound or controlled recommendation baseline.
- A learned assistant trained from demonstrations, simulated trajectories, prior gameplay, or another approved source of experience.
- A small pilot study or controlled technical evaluation.
- Documentation sufficient for another student to reproduce the environment and analysis.

### 5.2 Out of scope unless added through change control

- Deployment in an actual emergency-response setting.
- Claims of safety, reliability, or effectiveness for real-world search-and-rescue.
- A large or demographically representative human-subject study.
- High-fidelity robotics, computer vision from physical sensors, or integration with emergency-services infrastructure.
- An unrestricted conversational agent with access to sensitive or external operational data.
- A production-grade multiplayer platform.
- Training a large foundation model from scratch.

---

## 6. Experimental Task Concept

The initial task will be a top-down or otherwise simplified search-and-rescue game. The exact implementation may vary by platform, but the experimental logic should remain stable.

### 6.1 Core task elements

- A map containing traversable space, obstacles, rooms, victims, and optional hazards.
- One human-controlled operator; a second human or simulated teammate may be added if feasible.
- Partial observability, such as limited field of view, hidden rooms, or incomplete victim information.
- A mission timer or continuously increasing time penalty.
- Rewards for locating, triaging, or rescuing victims.
- Costs for elapsed time, failed rescue attempts, unnecessary travel, resource misuse, or missed victims.
- Limited resources such as medical kits, energy, communication opportunities, or carrying capacity.
- Decision points at which an AI assistant could provide useful guidance.

### 6.2 Candidate mission utility

A preliminary mission score may be expressed as:

```text
mission_utility = rescue_reward
                  - time_cost
                  - failed_action_cost
                  - resource_waste_cost
                  - missed_victim_cost
```

The specific weights must be fixed before confirmatory evaluation. Sensitivity analysis should test whether conclusions depend on a particular weighting scheme.

### 6.3 Scenario families

At least two scenario families should be considered:

- **Training scenarios:** used for familiarization and, where appropriate, model training.
- **Evaluation scenarios:** held out from model development and used to measure generalization.

Scenarios should vary in map layout, victim placement, task difficulty, time pressure, and the usefulness of different recommendation types.

---

## 7. AI Oracle and Learned Assistant Workstream

The AI component is a central part of the project and will be developed and evaluated independently from the choice of game platform.

### 7.1 Terminology

For this project, **oracle** refers to a decision-support component that receives a representation of the current task state and may return a recommendation to the human operator. The term does not imply that the component is always correct.

The project should distinguish among the following systems:

1. **Privileged oracle:** Uses complete simulator state or known optimal paths. This condition estimates the value of high-quality assistance and provides an upper-bound benchmark.
2. **Scripted or heuristic assistant:** Uses transparent rules, such as nearest-priority-victim, low-resource warning, or route replanning.
3. **Learned assistant:** Uses experience from demonstrations, prior trajectories, simulation, reinforcement learning, supervised learning, imitation learning, or another approved method.
4. **No-assistance baseline:** Receives the same interface and task environment without recommendations.

A random, delayed, or intentionally degraded assistant may be added only if scientifically justified and ethically reviewed.

### 7.2 AI inputs

The AI service may receive some or all of the following, depending on the experimental condition:

- Current player position, heading, velocity, and recent action history.
- Visible and previously observed map regions.
- Known victim locations, victim types, and rescue status.
- Remaining time and resources.
- Current score and estimated mission utility.
- Teammate location, status, or communications.
- Recent recommendations and whether the user followed them.
- Scenario identifier and task configuration.

The input schema must explicitly mark information that is privileged and unavailable to the human.

### 7.3 AI outputs

Each recommendation should use a structured representation such as:

```json
{
  "recommendation_id": "uuid",
  "trial_id": "trial-001",
  "timestamp_generated": "ISO-8601",
  "recommendation_type": "navigate|prioritize|warn|resource|abstain",
  "target": "victim-or-location-id",
  "message": "Search the east corridor next.",
  "confidence": 0.78,
  "rationale_code": "highest_expected_utility",
  "model_version": "oracle-v0.2",
  "state_version": 184
}
```

The interface should support abstention when the system lacks sufficient confidence or when a recommendation would be redundant.

### 7.4 Learning from experience

The learned assistant work should document:

- What constitutes an experience tuple or trajectory.
- The source of training data: scripted agents, human demonstrations, generated scenarios, or previous trials.
- The prediction or decision target.
- Train, validation, and held-out evaluation splits.
- Measures taken to prevent leakage between training and evaluation scenarios.
- Baselines used to determine whether learning adds value beyond simple heuristics.
- Model versioning and reproducibility controls.

A possible initial learning formulation is to predict the next high-value objective or recommendation category from the current state and recent trajectory. More complex sequential decision-making methods should be added only after a simple baseline is working and measurable.

### 7.5 AI service architecture

The preferred architecture is a separate Python service that exposes a stable interface to the game environment:

```text
Game/Testbed -> State Adapter -> Python Oracle Service
             <- Recommendation Adapter <-

All components -> Event Log -> Validation/ETL -> Analysis Tables
```

The service may use HTTP, WebSocket, or a local message queue. Separating the AI service from the game allows the same assistant to be evaluated in ASIST, Unity, Godot, or another approved environment.

### 7.6 AI performance measures

The AI component will be evaluated both independently and as part of the human-AI team.

**Offline AI measures may include:**

- Recommendation accuracy or agreement with an approved target policy.
- Expected utility of recommended actions.
- Regret relative to a privileged policy.
- Calibration of confidence.
- Abstention quality.
- Inference latency.
- Generalization to held-out maps or scenario parameters.

**Human-AI teaming measures may include:**

- Recommendation exposure, acknowledgment, and compliance rates.
- Time from recommendation display to user action.
- Utility gained or lost after a recommendation.
- Frequency of ignored correct advice and followed incorrect advice.
- Trust, perceived helpfulness, workload, and perceived interruption.
- Performance with the assistant disabled, enabled, or degraded.

### 7.7 AI acceptance criteria

At minimum, the AI workstream is complete when:

- A versioned Python oracle API can consume task-state messages and return structured recommendations.
- A deterministic heuristic or privileged baseline is reproducible.
- A learned model can be trained from a documented dataset and evaluated on held-out scenarios.
- Recommendation content, context, timing, model version, confidence, delivery, and user response are logged.
- End-to-end recommendation latency is measured.
- The report clearly distinguishes assistant-model quality from the causal effect of presenting assistance to a human.

---

## 8. Experimental Platform Evaluation

Platform selection is an explicit project deliverable. The Cornell ASIST Lightweight Testbed is a candidate, not a predetermined final choice.

### 8.1 Platform-independent requirements

The selected environment should support:

- Deterministic or seedable scenarios.
- Capture of user input and game-state transitions with reliable timestamps.
- Access to the state required by each oracle condition.
- Real-time display of recommendations.
- Logging of recommendation exposure and user response.
- Configurable maps, rewards, costs, timer, victim placement, and resources.
- Repeatable deployment on available lab hardware.
- Export to analysis-ready formats.
- Separation of participant identifiers from event data.
- Sufficient performance for low-latency interaction.
- Reasonable development effort for the student project period.

### 8.2 Option A - Cornell ASIST Lightweight Testbed

The supplied snapshot is a two-player browser-based search-and-rescue environment. Its client uses JavaScript, Express, Pug, and Phaser; its API uses Python/FastAPI with Socket.IO, Redis, and Firebase. It already includes semantic-map loading, configurable victim counts and scoring, a timer, surveys, player communication, rescue events, and periodic position logging.

**Potential advantages**

- Existing search-and-rescue task and assets.
- Existing multiplayer synchronization and room assignment.
- Existing consent, instruction, and survey flow.
- Existing event storage path and a Python server component.
- Semantic maps and configurable rescue parameters.
- Faster path to an initial pilot if the supplied system runs reliably.
- Prior research-testbed framing may simplify experimental design discussions.

**Potential disadvantages or risks**

- The supplied code snapshot is from 2023 and uses older pinned backend and web dependencies that may require maintenance before experimentation.
- The stack spans JavaScript, Node, Phaser, Python, Redis, Firebase, WebSockets, and optional TLS, increasing setup complexity.
- Current telemetry focuses on periodic position and selected game events; explicit key-down/key-up timing, recommendation exposure, model state, and user-response logging must be added.
- The existing data representation stores JSON-encoded messages in Firebase nodes, so an extraction and validation layer is required.
- Custom AI interface and recommendation UI are not present in the supplied snapshot.
- Some experimental behavior is hard-coded, so systematic condition assignment and configuration management require refactoring.
- The student may spend significant time understanding legacy code rather than developing the AI and analysis components.

**ASIST feasibility spike**

The student should time-box an ASIST spike that demonstrates:

1. Local deployment from a clean environment.
2. Completion of a full trial with exported data.
3. Addition of one new telemetry event.
4. Delivery and display of one mock AI recommendation.
5. A documented estimate for the remaining modifications.

### 8.3 Option B - Custom Unity or Godot Environment

A custom environment would implement only the mechanics needed to test the hypotheses. The game client would send state and events to the same platform-independent Python oracle and logging interfaces.

**Potential advantages**

- Full control over scenario design, task difficulty, visual presentation, and recommendation interface.
- Precise logging of key-down/key-up events, clicks, UI focus, state transitions, frame or physics timestamps, and recommendation interactions.
- Easier creation of curated scenarios designed around specific decision points.
- Cleaner configuration and versioning if experiment requirements are defined before implementation.
- Greater ability to create deterministic simulations, replay trials, and run automated agents.
- Reduced dependence on legacy research-testbed assumptions.

**Potential disadvantages or risks**

- Substantial up-front work to build maps, collision, scoring, timing, victim behavior, UI, surveys, participant flow, persistence, and deployment.
- Unity primarily introduces C#; Godot commonly introduces GDScript or C#. Either may dilute a Python-focused learning objective unless the AI and analysis layers remain separate Python services.
- Multiplayer and networking can expand scope quickly and should be avoided unless necessary for the hypothesis.
- A custom system must recreate experimental safeguards and data-management features that an existing testbed may already provide.
- More opportunities for unrecognized bugs in game mechanics or instrumentation.

**Custom-environment feasibility spike**

The student should build a vertical slice containing:

1. One small map.
2. Player movement and one rescue interaction.
3. A timer and mission score.
4. Complete input and state-transition logging.
5. A mock recommendation received from a Python service.
6. Replay or deterministic rerun from a fixed scenario seed.

### 8.4 Platform decision matrix

Score each criterion from 1 (poor) to 5 (excellent), then multiply by the agreed weight.

| Criterion | Weight | ASIST score | Unity score | Godot score | Evidence / notes |
|---|---:|---:|---:|---:|---|
| Time to first instrumented trial | 5 | [TBD] | [TBD] | [TBD] | |
| Ease of AI integration | 5 | [TBD] | [TBD] | [TBD] | |
| Telemetry completeness and precision | 5 | [TBD] | [TBD] | [TBD] | |
| Scenario control and curation | 4 | [TBD] | [TBD] | [TBD] | |
| Reproducibility and deterministic replay | 4 | [TBD] | [TBD] | [TBD] | |
| Alignment with Python learning goals | 4 | [TBD] | [TBD] | [TBD] | |
| Deployment burden | 3 | [TBD] | [TBD] | [TBD] | |
| Multiplayer support, if required | 2 | [TBD] | [TBD] | [TBD] | |
| Maintainability for future students | 3 | [TBD] | [TBD] | [TBD] | |
| Licensing and distribution | 2 | [TBD] | [TBD] | [TBD] | |
| **Weighted total** |  | **[TBD]** | **[TBD]** | **[TBD]** | |

### 8.5 Platform selection gate

The mentors and student will select the primary platform after both feasibility spikes or an equivalent evidence-gathering process. The decision record will include:

- Measured setup and development time.
- Demonstrated telemetry and AI integration.
- Known technical risks.
- Expected work remaining.
- Rationale for the chosen platform.
- A fallback plan if the chosen platform becomes infeasible.

A small Python-native simulator may be used as a fallback for testing the AI service and analysis pipeline if either full game-engine path threatens the research schedule.

---

## 9. Technical Architecture and Data Contracts

### 9.1 Proposed components

1. **Game or testbed client** - renders the task, receives input, and displays recommendations.
2. **State adapter** - converts platform-specific state into the common oracle schema.
3. **Python oracle service** - runs privileged, heuristic, or learned policies.
4. **Recommendation adapter** - renders recommendations and records exposure and interaction.
5. **Event logger** - writes append-only event records with synchronized timestamps.
6. **Raw data store** - preserves original events without manual editing.
7. **Python validation and ETL pipeline** - detects malformed, missing, duplicated, or out-of-order events and produces analysis tables.
8. **Analysis package** - calculates metrics, generates figures, and reproduces statistical results.

### 9.2 Required identifiers

Every event should include, where applicable:

- `study_id`
- `participant_id` or pseudonymous code
- `session_id`
- `trial_id`
- `scenario_id`
- `condition_id`
- `event_id`
- `event_type`
- `source`
- `client_timestamp`
- `server_timestamp`
- `sequence_number`
- `game_time_ms`
- `model_version`
- `schema_version`

### 9.3 Minimum event types

- Trial and mission start/end.
- Scenario and condition configuration.
- Key-down/key-up or equivalent action input.
- Player position and orientation.
- Object discovery and visibility changes.
- Rescue attempt, success, and failure.
- Resource acquisition and consumption.
- Score or utility changes.
- AI state request and response.
- Recommendation generated, delivered, displayed, dismissed, acknowledged, expired, and acted upon.
- Connection, focus, pause, error, and disconnect events.
- Survey completion and approved self-report measures.

### 9.4 Data-quality checks

The pipeline will check for:

- Missing required fields.
- Duplicate event identifiers.
- Non-monotonic sequence numbers.
- Implausible or negative time intervals.
- Client/server clock disagreement.
- Events occurring outside trial boundaries.
- Recommendations linked to missing or stale state versions.
- Outcomes without corresponding attempts.
- Participant identifiers appearing in analysis tables.
- Differences between configured and observed scenario parameters.

---

## 10. Experimental Design

### 10.1 Candidate assistance conditions

The final pilot should use the smallest set of conditions capable of answering the primary question. Candidate conditions are:

- **C0 - No assistance.**
- **C1 - Scripted or heuristic assistant.**
- **C2 - Privileged oracle.**
- **C3 - Learned assistant.**

For a limited student project, a reasonable first comparison is C0 versus C2 to test the value of high-quality assistance, followed by C1 or C3 if time permits. Comparing all four conditions without sufficient trials may produce inconclusive results.

### 10.2 Assignment and counterbalancing

The experimental protocol will specify:

- Between-subjects, within-subjects, or mixed design.
- Randomization method.
- Scenario order and counterbalancing.
- Training and practice procedures.
- Washout or separation between conditions.
- Exclusion criteria established before analysis.
- Handling of incomplete or technically invalid trials.

A within-subjects pilot may provide higher sensitivity with a small sample, but it requires careful counterbalancing and management of learning effects.

### 10.3 Primary outcome

The preferred primary outcome is **mission utility**, computed from rescue outcomes, time, failures, and resource use according to a preregistered formula.

### 10.4 Secondary outcomes

- Number and value of victims rescued.
- Time to first rescue and time to mission completion.
- Distance traveled and redundant search.
- Failed rescue attempts and resource waste.
- Decision latency at predefined decision points.
- Recommendation compliance and response latency.
- Utility change associated with recommendations.
- Workload, trust, perceived usefulness, and situation awareness, using approved instruments where feasible.

### 10.5 Analysis approach

The analysis will prioritize effect estimates and uncertainty rather than only binary significance decisions. Depending on the design, methods may include:

- Descriptive statistics and confidence intervals.
- Paired or independent comparisons.
- Regression or mixed-effects models for repeated trials.
- Time-to-event analysis for rescue times.
- Calibration and reliability plots for assistant confidence.
- Error analysis of helpful, ignored, misleading, late, and redundant recommendations.
- Sensitivity analysis over alternative mission-utility weights.

The student will document exploratory analyses separately from confirmatory analyses.

---

## 11. Work Packages

### WP1 - Research framing and operational definitions

**Activities**

- Review relevant literature.
- Define "assistance," "oracle," "helpful," "harmful," and "mission utility."
- Identify candidate decision points and recommendation types.
- Draft the experimental protocol and initial data dictionary.

**Outputs**

- Annotated bibliography or literature matrix.
- Research questions and hypothesis document.
- Initial task specification and metric definitions.

### WP2 - Platform feasibility and selection

**Activities**

- Run and inspect the supplied ASIST client/API.
- Complete the ASIST feasibility spike.
- Complete a small Unity or Godot vertical slice, or document why one engine was selected for the spike.
- Score the platform decision matrix.

**Outputs**

- Platform comparison memo.
- Demonstration of both integration approaches or equivalent evidence.
- Signed platform decision record.

### WP3 - Telemetry and data pipeline

**Activities**

- Define versioned event schemas.
- Add input, state, recommendation, and outcome logging.
- Export raw events.
- Build validation and transformation scripts in Python.
- Produce a data dictionary and trial-level analysis table.

**Outputs**

- Logging module or adapters.
- Raw-to-clean ETL pipeline.
- Automated data-quality report.
- Example cleaned dataset.

### WP4 - Oracle baselines and learning pipeline

**Activities**

- Implement a privileged or deterministic oracle.
- Implement at least one simple heuristic baseline.
- Define the experience representation.
- Generate or collect training trajectories.
- Train and evaluate a learned model.
- Version model artifacts and configurations.

**Outputs**

- Python oracle service.
- Baseline policies.
- Model-training script or notebook converted into a reproducible script.
- Offline evaluation report.

### WP5 - Human-AI interface and integration

**Activities**

- Integrate the oracle service with the selected platform.
- Implement recommendation presentation and optional explanation.
- Add confidence, expiration, and abstention behavior.
- Log delivery, visibility, acknowledgment, and response.
- Measure end-to-end latency.

**Outputs**

- Working end-to-end assisted trial.
- Recommendation UI.
- Integration and latency test results.

### WP6 - Pilot evaluation

**Activities**

- Prepare approved recruitment, consent, and study materials if human subjects are involved.
- Run internal technical trials.
- Conduct a small pilot under approved conditions.
- Review data quality before substantive analysis.

**Outputs**

- Pilot protocol.
- Trial manifest and de-identified dataset.
- Data-quality and protocol-deviation log.

### WP7 - Analysis, reporting, and handoff

**Activities**

- Calculate primary and secondary outcomes.
- Produce figures and structured error analysis.
- Document limitations and follow-on work.
- Package code, configuration, data dictionary, and runbook.
- Present findings.

**Outputs**

- Research-style technical report.
- Reproducible artifact package.
- Final presentation or poster.
- Backlog of recommended future work.

---

## 12. Schedule and Milestones

The table below assumes a 12-week project and should be adjusted to the actual period.

| Week | Milestone | Evidence of completion |
|---:|---|---|
| 1 | Project kickoff and environment setup | Repositories run; development environment documented |
| 2 | Research questions and metrics frozen for prototype | Approved task specification and data dictionary draft |
| 3 | ASIST feasibility spike | Trial run, exported data, mock recommendation displayed |
| 4 | Unity/Godot feasibility spike and platform gate | Vertical slice, decision matrix, selected platform |
| 5 | Common telemetry schema and raw logging | Schema tests and sample event log |
| 6 | Validation/ETL pipeline | Clean tables and automated quality report |
| 7 | Privileged and heuristic oracle baselines | Offline benchmark results |
| 8 | Learned assistant baseline | Reproducible training and held-out evaluation |
| 9 | End-to-end integration | Assisted trial with full recommendation logging |
| 10 | Internal pilot and instrumentation revision | Pilot report and resolved critical defects |
| 11 | Approved evaluation and analysis | Frozen dataset and initial figures |
| 12 | Final report, presentation, and handoff | Accepted artifact package and presentation |

### Milestone gate rules

- Human-subject data collection will not begin before required institutional approval.
- The platform will not be expanded to multiplayer unless the primary hypothesis requires it and the core single-player pipeline is stable.
- A complex learned model will not replace the baseline until the baseline is reproducible and its errors are understood.
- Pilot data will not be interpreted until data-quality checks pass.

---

## 13. Deliverables and Acceptance Criteria

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| D1 | Project specification | Defines task, hypotheses, outcomes, conditions, scope, and exclusions |
| D2 | Platform comparison memo | Contains evidence from feasibility work, weighted decision matrix, decision, and fallback |
| D3 | Deployment runbook | A new team member can set up and run a trial from a clean machine using documented steps |
| D4 | Telemetry specification | Versioned schema covers actions, state, recommendations, outcomes, errors, and timing |
| D5 | Data pipeline | Raw data can be converted into validated analysis tables by a documented command |
| D6 | Oracle service | Versioned Python API supports privileged/heuristic and learned policies through a common contract |
| D7 | Learned model artifact | Training data source, split, features, target, configuration, metrics, and limitations are documented |
| D8 | Integrated prototype | Human can complete an assisted trial; all recommendation lifecycle events are logged |
| D9 | Pilot dataset | De-identified, documented, validated, and linked to a trial manifest |
| D10 | Analysis package | Reproduces tables and figures from cleaned data without manual edits |
| D11 | Final report | Presents methods, results, error analysis, limitations, and next steps |
| D12 | Presentation/poster | Communicates motivation, system, experiment, results, and lessons learned |

---

## 14. Roles and Responsibilities

### Student

- Maintain the code repository and project log.
- Implement agreed technical components.
- Write tests and documentation alongside development.
- Prepare demonstrations for milestone reviews.
- Flag blockers, scope risks, data issues, and ethical concerns promptly.
- Produce the final artifact package and report.

### Faculty mentor(s)

- Approve research questions, scope, and platform decision.
- Provide guidance on experimental design, AI methods, and analysis.
- Review human-subjects requirements and ensure data collection is authorized.
- Review milestone evidence and provide timely feedback.
- Help distinguish educational prototypes from claims requiring stronger validation.

### Optional collaborators

[List collaborator, role, expected contribution, and data/code access.]

---

## 15. Project Management and Communication

- **Regular meeting cadence:** [Weekly / twice weekly], [duration].
- **Student progress update:** Brief written update before each meeting describing completed work, evidence, blockers, and next steps.
- **Code review:** At least [weekly / per milestone].
- **Decision log:** Significant choices about scope, platform, metrics, conditions, and models will be recorded in the repository.
- **Issue tracking:** Tasks and defects will be maintained in [GitHub/GitLab/other].
- **Demonstrations:** Working software and generated artifacts will be demonstrated at milestone gates rather than reported only verbally.

---

## 16. Reproducibility and Software Quality

The project repository should include:

- A clear `README` and setup instructions.
- Locked or documented dependencies.
- Configuration files separated from source code.
- Fixed random seeds where appropriate.
- Versioned scenario, schema, and model identifiers.
- Automated tests for scoring, state conversion, event validation, and recommendation contracts.
- A small synthetic or approved example dataset for testing the pipeline.
- Commands or scripts that regenerate analysis outputs.
- No credentials, private keys, or participant identifiers in version control.

Notebooks may be used for exploration, but final data processing and model evaluation should be runnable as scripts or a documented pipeline.

---

## 17. Human Subjects, Ethics, and Data Management

Before collecting data from people, the mentors will determine whether institutional review, exemption, or another approval is required. No recruitment or data collection will occur until the required determination is documented.

The study plan should address:

- Informed consent and the ability to withdraw.
- Minimal collection of personally identifiable information.
- Separation of identity/contact data from telemetry.
- Secure storage and access control.
- Retention and deletion schedule.
- Treatment of free-text communications, if enabled.
- Disclosure that AI recommendations may be incorrect.
- Avoidance of deceptive or unsafe recommendation conditions unless specifically approved.
- Accessibility and reasonable accommodations.
- Whether gameplay, screen, audio, or video recording is necessary.

The final report must avoid implying that performance in a simplified game proves effectiveness in actual emergency response.

---

## 18. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation / trigger |
|---|---|---|---|
| ASIST dependency or setup failures | Medium | High | Time-box spike; containerize where practical; switch to custom or Python-native fallback if gate fails |
| Custom game consumes the full project | Medium | High | Build one vertical slice; avoid multiplayer and unnecessary art; freeze mechanics early |
| AI model lacks sufficient training data | High | Medium | Begin with privileged and heuristic baselines; generate simulations; limit learning target |
| Recommendations add latency | Medium | Medium | Asynchronous service, timeouts, caching, abstention, and latency logging |
| Telemetry is incomplete or inconsistent | Medium | High | Schema tests, sequence numbers, synchronized timestamps, automated quality report |
| Participant learning or scenario imbalance | Medium | Medium | Counterbalance order, use held-out scenarios, record practice exposure |
| Too many experimental conditions | High | High | Prioritize no-assistance versus privileged oracle; add learned condition only when powered and stable |
| Human-subject approval delays | Medium | High | Start determination early; maintain a simulation-only technical evaluation path |
| Student must learn several languages/stacks | High | Medium | Keep AI, data, and analysis in Python; limit client edits to necessary interfaces |
| Incorrect AI advice harms performance | Expected research risk | Medium | Log confidence and provenance; allow abstention; include no-assistance baseline; analyze failure modes |
| Results do not support the hypothesis | Medium | Low | Treat null or negative results as valid; emphasize measurement quality and boundary conditions |

---

## 19. Definition of Done

The project is complete when all required deliverables are accepted and the team can demonstrate that:

1. A user can complete a reproducible search-and-rescue trial.
2. The same task can be run with and without AI assistance under controlled configuration.
3. The AI service includes a documented baseline and a learned component.
4. Every recommendation is linked to the state that generated it and to subsequent user behavior.
5. Raw trial data can be validated and transformed into analysis tables using documented Python commands.
6. The analysis reports both team outcomes and AI-specific performance.
7. The final report explains when assistance helped, harmed, arrived too late, or was ignored.
8. The repository contains no secrets or direct participant identifiers.
9. Another student can reproduce the demonstration and principal analysis using the runbook.

---

## 20. Change Control

Changes that materially affect the research question, platform, participant population, primary outcome, data collected, AI condition, or project schedule require a written change entry containing:

- Requested change.
- Reason for the change.
- Effect on scope, schedule, risk, and deliverables.
- Approval by the student and faculty mentor(s).
- Any required update to institutional review materials.

Minor implementation details may be changed through normal issue tracking.

---

## 21. Approval

By approving this SOW, the student and mentor(s) agree that it describes the current project scope and that changes will be handled through the process above.

| Role | Name | Signature / approval | Date |
|---|---|---|---|
| Student | [Name] | [TBD] | [TBD] |
| Faculty mentor | [Name] | [TBD] | [TBD] |
| Faculty mentor | [Name] | [TBD] | [TBD] |

---

# Appendix A - Platform Spike Checklist

## ASIST

- [ ] Clean installation completed.
- [ ] API, Redis, client, and data store run reliably.
- [ ] Full mission completed.
- [ ] Raw data exported and parsed.
- [ ] Existing event frequency and timestamp behavior measured.
- [ ] Key-down/key-up or equivalent input logging added.
- [ ] Mock recommendation delivered from Python and displayed.
- [ ] Recommendation lifecycle logged.
- [ ] Deployment and maintenance effort estimated.
- [ ] Critical dependency/security updates identified.

## Unity or Godot

- [ ] Small map and collision implemented.
- [ ] Player movement and rescue action implemented.
- [ ] Timer, reward, and cost function implemented.
- [ ] Complete input and state logging implemented.
- [ ] Seeded scenario generation or deterministic configuration implemented.
- [ ] Mock recommendation delivered from Python and displayed.
- [ ] Recommendation lifecycle logged.
- [ ] Build and deployment steps documented.
- [ ] Remaining development effort estimated.

---

# Appendix B - Recommendation Lifecycle

A recommendation should progress through observable events:

```text
state_observed
  -> recommendation_requested
  -> recommendation_generated
  -> recommendation_delivered
  -> recommendation_displayed
  -> acknowledged | dismissed | expired
  -> followed | not_followed | ambiguous
  -> outcome_observed
```

Each transition should include a timestamp, recommendation identifier, state version, and model version.

---

# Appendix C - Initial Repository Structure

```text
project/
  README.md
  docs/
    statement_of_work.md
    platform_decision.md
    experiment_protocol.md
    data_dictionary.md
    runbook.md
  configs/
    scenarios/
    experiments/
    models/
  game_adapter/
    asist/
    unity_or_godot/
  oracle_service/
    api/
    policies/
    models/
    tests/
  telemetry/
    schemas/
    validators/
  analysis/
    src/
    tests/
    reports/
  scripts/
  sample_data/
  results/
```

---

# Appendix D - Questions to Resolve at Kickoff

1. Is the primary unit of study an individual or a two-person team?
2. Is the first scientific goal to test ideal assistance, learned assistance, or both?
3. What information may the AI access that the human cannot?
4. Must recommendations be textual, visual, auditory, or multimodal?
5. How many scenarios and pilot participants are feasible?
6. What is the primary mission-utility formula?
7. Which user-input events require millisecond-level timing?
8. Is real-time multiplayer necessary for the first study?
9. What institutional review and data-security requirements apply?
10. What minimum result would make the project a successful educational and research outcome even if the main hypothesis is not supported?
