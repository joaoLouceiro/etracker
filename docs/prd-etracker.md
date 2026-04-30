# PRD: etracker — E-Learning Focus Tracker

## Problem Statement

Learners who self-direct their education online frequently encounter new resources and topics of interest while working through existing material. This leads to constant context-switching: half-finished courses, abandoned articles, and a growing list of "things to look at later" that never get looked at. There is no lightweight tool that helps a learner commit to a topic, track their progress through its resources, and capture their thinking — without tempting them with recommendations or new content.

## Solution

etracker is a solo web application that helps learners finish what they start. A learner organises their study material into **topics** (a goal, e.g. "learn TypeScript") and attaches **resources** (URLs — articles, videos, courses) to each topic. The app enforces focus by limiting active topics to three at a time. Progress through a topic is calculated from the state of its resources. Notes can be captured at both the resource level (raw reactions) and the topic level (synthesis). There are no suggestions, no recommendations, and no social features.

## User Stories

1. As a learner, I want to create a topic with a title and optional description, so that I can define a clear learning goal.
2. As a learner, I want to be prevented from having more than 3 active topics at a time, so that I am forced to focus rather than accumulate.
3. As a learner, I want to see all my active topics on a dashboard, so that I can quickly orient myself when I open the app.
4. As a learner, I want my backlog of inactive topics to be de-emphasised on the dashboard, so that I am not distracted by things I haven't committed to yet.
5. As a learner, I want to add a resource to a topic by pasting a URL, so that I can capture material with minimal friction.
6. As a learner, I want the title of a resource to be automatically fetched from its URL, so that I don't have to type it manually.
7. As a learner, I want to optionally tag a resource with a type (article, video, course, book), so that I know what kind of commitment it represents at a glance.
8. As a learner, I want each resource to have three states — not started, in progress, done — so that I can see what I am actively working on.
9. As a learner, I want to transition a resource from not started to in progress when I begin it, so that my current focus is visible.
10. As a learner, I want to mark a resource as done when I finish it, so that my progress is recorded.
11. As a learner, I want to see a progress percentage on each topic, calculated from the states of its resources, so that I have a motivating sense of how far along I am.
12. As a learner, I want to explicitly close a topic when I feel I have completed it, so that the act of finishing is marked as a deliberate, satisfying moment.
13. As a learner, I want to write freeform markdown notes on a resource, so that I can capture my raw reactions and highlights while studying.
14. As a learner, I want to write freeform markdown notes at the topic level, so that I can synthesise what I've learned across all resources.
15. As a learner, I want to reopen a closed topic if I realise I have more to learn, so that I am not locked out of material I've already invested in.
16. As a learner, I want to move a topic from backlog to active (subject to the 3-topic limit), so that I can start working on it when I'm ready.
17. As a learner, I want to archive or delete a topic I no longer care about, so that my backlog stays clean.
18. As a learner, I want to reorder resources within a topic, so that I can sequence my study material intentionally.
19. As a learner, I want to remove a resource from a topic, so that I can drop material that turned out to be irrelevant.
20. As a learner, I want to log in with my Google account, so that I don't have to manage a password.
21. As a learner, I want to log in with email and password as an alternative, so that I can use the app without a Google account.
22. As a learner, I want my data to be private to my account, so that no one else can see my topics, resources, or notes.
23. As a learner, I want the app to be usable on my phone, so that I can add a resource the moment I find it while browsing.
24. As a learner, I want the app to be usable on my desktop, so that I can do serious note-taking and study tracking at my desk.
25. As a learner, I want to see the original URL of a resource so I can navigate to it directly, so that I can open the material when I'm ready to study.

## Implementation Decisions

### Modules

**Backend (Java / Spring Boot — REST API)**

- **Auth module**: Integrates with Auth0 as the OAuth2 / OIDC provider. Validates JWTs on every request via Spring Security. Extracts the authenticated user identity and makes it available to all downstream modules. Supports Google OAuth and email/password flows configured in Auth0.

- **Topic module**: Manages topic lifecycle — create, read, update, delete, activate, deactivate, close, reopen. Enforces the active-topic limit (max 3) as a domain rule before any state transition that would increase the active count. Delegates progress calculation to the Progress module.

- **Resource module**: Manages resources within a topic. Handles state transitions (not started → in progress → done, and reversals). On resource creation, fetches the page title from the provided URL (best-effort; falls back to the URL itself if fetching fails). Stores resource type as an optional enum.

- **Notes module**: Manages freeform markdown content attached to either a topic or a resource. Simple CRUD with no parsing or rendering on the server side.

- **Progress module**: Pure domain logic. Given a list of resource states for a topic, calculates a completion percentage (done resources / total resources). No I/O. Called by the Topic module when returning topic data.

**Frontend (React / TypeScript — SPA)**

- **Auth UI**: Handles login, signup, and OAuth redirect flows via the Auth0 React SDK. Stores the JWT and attaches it to all API requests.

- **Topic Dashboard**: The home screen. Renders active topics prominently (max 3 cards). Renders backlog topics in a visually subdued section below. Provides the entry point to create a new topic or activate a backlogged one.

- **Topic Detail**: Shows all resources for a topic with their current state, a progress bar, the topic-level notes editor, and the close-topic action.

- **Resource Detail**: State toggle control, resource-level notes editor, link to the external URL.

### Architecture

- Spring Boot exposes a pure REST API; React consumes it as a SPA. No server-side rendering.
- Auth0 issues JWTs; Spring Security validates them on every request. The React app uses the Auth0 React SDK to manage the auth flow.
- All data is scoped to the authenticated user — every query is filtered by user ID.

### Data model (logical)

- `User` — managed by Auth0; referenced by ID in the local database
- `Topic` — belongs to a user; has title, description, status (active / backlog / closed), created_at, closed_at
- `Resource` — belongs to a topic; has url, title (fetched), type (optional enum), state (not_started / in_progress / done), position (for ordering)
- `Note` — polymorphic; belongs to either a topic or a resource; has markdown body

### API contracts (high level)

- `GET /topics` — list all topics for the authenticated user
- `POST /topics` — create a topic
- `PATCH /topics/{id}` — update title, description, status
- `DELETE /topics/{id}` — delete a topic
- `GET /topics/{id}/resources` — list resources for a topic
- `POST /topics/{id}/resources` — add a resource (triggers URL title fetch)
- `PATCH /resources/{id}` — update state, type, position
- `DELETE /resources/{id}` — remove a resource
- `GET /topics/{id}/notes` — get topic-level note
- `PUT /topics/{id}/notes` — upsert topic-level note
- `GET /resources/{id}/notes` — get resource-level note
- `PUT /resources/{id}/notes` — upsert resource-level note

## Testing Decisions

### What makes a good test

Tests should verify external behaviour, not implementation details. A good test calls a module through its public interface and asserts on the observable outcome — it does not inspect internal state, mock collaborators unnecessarily, or couple to method names. Tests should remain valid after internal refactors.

### Modules to test

- **Progress module** — unit tested exhaustively. Pure function with no I/O: given a list of resource states, assert the correct percentage. Cover edge cases (no resources, all done, all not started, mixed).
- **Topic module — active limit enforcement** — unit tested. Assert that activating a 4th topic throws a domain error regardless of how the limit is implemented internally.
- **Resource module — state transitions** — unit tested. Assert valid transitions succeed and invalid ones are rejected.
- **REST API (integration tests)** — Spring Boot slice tests (`@WebMvcTest` or full `@SpringBootTest`) with a real database (Testcontainers + Postgres). Test the happy path and key error cases for each endpoint. Auth is tested by providing a valid/invalid JWT in the `Authorization` header.

### Prior art

No existing tests in the codebase — this is a greenfield project. Follow Spring Boot conventions: unit tests with JUnit 5 + AssertJ, integration tests with Testcontainers.

## Out of Scope

- Social features (following, shared topics, public profiles)
- Recommendations or suggestions of any kind
- Notifications or reminders
- Native mobile apps (iOS / Android)
- Rich text editor (notes are plain markdown, rendered client-side only)
- Time tracking or estimated durations per resource
- Collaborative / multi-user topics
- Import from external services (Pocket, Instapaper, etc.)
- Offline support

## Further Notes

- The EU hosting constraint (Railway Frankfurt for backend, Vercel EU for frontend, Supabase Frankfurt for Postgres) is a hard requirement — data must not leave the EU.
- Auth0 tenant should be configured in the EU region.
- The active-topic limit (3) and the "no suggestions" principle are the two load-bearing constraints of the product. Any future feature should be evaluated against both before being added.
- The URL title fetch on resource creation should be best-effort and non-blocking — a failed fetch must not prevent the resource from being saved.
- Labels: `needs-triage`
