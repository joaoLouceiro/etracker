## What to build

Topic close and reopen end-to-end: API support for transitioning a topic to closed status, a deliberate close action in the UI (with confirmation), a closed topics section, and a reopen action. After this slice a user can mark a topic as finished and reopen it if needed.

## Acceptance criteria

- [ ] `PATCH /topics/{id}` with `status: closed` sets closed_at timestamp and transitions the topic to closed
- [ ] Closing a topic frees up an active slot (active count decreases by 1)
- [ ] `PATCH /topics/{id}` with `status: active` reopens a closed topic (subject to the 3-topic limit)
- [ ] Topic detail view has a "Mark as complete" button that triggers a confirmation before closing
- [ ] Closed topics appear in a separate section (e.g. below the backlog) on the dashboard
- [ ] Integration tests: close → active slot freed; reopen → limit enforced

## Blocked by

- #3 Topic CRUD + dashboard shell
