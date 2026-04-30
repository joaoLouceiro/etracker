## What to build

Resource state transitions end-to-end: API endpoint to update resource state, state toggle UI in the topic detail view, and validation of allowed transitions. After this slice a user can move a resource through not started → in progress → done (and back).

## Acceptance criteria

- [ ] `PATCH /resources/{id}` accepts a `state` field and updates it; rejects requests from non-owners with 403
- [ ] All three states are reachable from any other state (transitions are not strictly one-directional)
- [ ] Topic detail view shows a state control per resource (e.g. a toggle or dropdown)
- [ ] State change is reflected immediately in the UI without a full page reload
- [ ] Unit tests: valid state values accepted; invalid values rejected with 400
- [ ] Integration test: state transition round-trip via the API

## Blocked by

- #5 Add resource + URL title fetch
