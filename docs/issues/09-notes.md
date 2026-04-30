## What to build

Freeform markdown notes at both topic and resource level end-to-end: database schema, upsert API endpoints, and a notes editor in the topic detail and resource detail views. After this slice a user can write and save notes on any topic or resource.

## Acceptance criteria

- [ ] `notes` table created with: id, owner_type (topic/resource), owner_id, body (text), updated_at
- [ ] `GET /topics/{id}/notes` returns the topic's note (empty body if none exists)
- [ ] `PUT /topics/{id}/notes` upserts the topic note; rejects requests from non-owners with 403
- [ ] `GET /resources/{id}/notes` returns the resource's note
- [ ] `PUT /resources/{id}/notes` upserts the resource note; rejects requests from non-owners with 403
- [ ] Topic detail view includes a notes editor (plain textarea or markdown-aware editor) that auto-saves or has an explicit save action
- [ ] Resource detail view includes a notes editor with the same behaviour
- [ ] Notes body is stored and returned as-is (no server-side rendering or parsing)
- [ ] Integration tests cover upsert (create + update) and the 403 cross-user case

## Blocked by

- #5 Add resource + URL title fetch
