## What to build

Topic lifecycle end-to-end: database schema, REST API for creating/reading/updating/deleting topics, and a dashboard UI showing active topics prominently and the backlog de-emphasised. After this slice a user can create topics, see them on the dashboard, and delete ones they no longer want.

## Acceptance criteria

- [ ] `topics` table created with: id, user_id, title, description, status (active/backlog/closed), created_at, closed_at
- [ ] `POST /topics` creates a topic (defaults to backlog status)
- [ ] `GET /topics` returns all topics for the authenticated user, grouped by status
- [ ] `PATCH /topics/{id}` updates title and description; rejects requests from other users with 403
- [ ] `DELETE /topics/{id}` deletes a topic and its resources/notes; rejects requests from other users with 403
- [ ] Dashboard renders active topics as prominent cards and backlog topics in a subdued list below
- [ ] "New topic" form is accessible from the dashboard
- [ ] All queries are scoped to the authenticated user — no topic leaks across users
- [ ] Integration tests cover CRUD happy paths and the 403 cross-user case

## Blocked by

- #2 Authentication
