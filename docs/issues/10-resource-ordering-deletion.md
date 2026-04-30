## What to build

Resource ordering and deletion end-to-end: API support for reordering resources within a topic (position field) and deleting a resource, with corresponding UI controls. After this slice a user can sequence their study material and remove resources that are no longer relevant.

## Acceptance criteria

- [ ] `PATCH /resources/{id}` accepts a `position` field and updates the resource's order within its topic
- [ ] `GET /topics/{id}/resources` always returns resources sorted by position ascending
- [ ] Reordering one resource updates positions of other resources in the topic consistently (no duplicate positions)
- [ ] `DELETE /resources/{id}` removes the resource; rejects non-owner requests with 403
- [ ] Topic detail view has up/down controls (or drag-and-drop) for reordering resources
- [ ] Topic detail view has a delete action per resource (with confirmation)
- [ ] Integration tests: reorder two resources and verify new order; delete and verify removal

## Blocked by

- #5 Add resource + URL title fetch
