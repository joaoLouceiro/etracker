## What to build

Enforce the core focus constraint: a user may have at most 3 active topics at a time. The limit is a domain rule enforced in the backend and surfaced clearly in the UI. After this slice, activating a 4th topic is rejected with a meaningful error.

## Acceptance criteria

- [ ] Attempting to activate a topic when 3 are already active returns a 422 with a descriptive error message
- [ ] The UI disables or hides the "activate" action on backlog topics when 3 active topics exist, with a visible explanation
- [ ] Moving a topic from active to backlog frees up a slot immediately
- [ ] Unit test: activating a 4th topic throws a domain exception regardless of internal implementation
- [ ] Unit test: activating when 2 are active succeeds
- [ ] Integration test: the 422 response is returned via the API

## Blocked by

- #3 Topic CRUD + dashboard shell
