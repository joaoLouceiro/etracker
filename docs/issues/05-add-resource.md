## What to build

Resources end-to-end: database schema, REST API for adding and removing resources to a topic, best-effort URL title fetching on creation, and a resource list in the topic detail view. After this slice a user can paste a URL into a topic and see it appear with an auto-fetched title.

## Acceptance criteria

- [ ] `resources` table created with: id, topic_id, url, title, type (nullable enum: article/video/course/book), state (not_started/in_progress/done), position, created_at
- [ ] `POST /topics/{id}/resources` creates a resource; triggers async title fetch from the URL (best-effort — a failed fetch must not prevent the resource from saving; falls back to the URL string)
- [ ] `GET /topics/{id}/resources` returns resources ordered by position
- [ ] `DELETE /resources/{id}` removes the resource; rejects requests from non-owners with 403
- [ ] Topic detail view lists resources with their title, type badge (if set), and current state
- [ ] "Add resource" form accepts a URL and optional type selector
- [ ] Integration tests cover add, list, delete, and the cross-user 403 case
- [ ] Unit test: URL title fetch failure does not throw — resource is saved with URL as fallback title

## Blocked by

- #3 Topic CRUD + dashboard shell
