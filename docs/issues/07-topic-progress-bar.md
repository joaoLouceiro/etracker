## What to build

Topic progress calculation and display end-to-end: a pure progress module in the backend, a progress percentage included in topic API responses, and a progress bar rendered on both the topic card (dashboard) and the topic detail view.

## Acceptance criteria

- [ ] Progress is calculated as: (resources with state = done) / (total resources) × 100, rounded to the nearest integer
- [ ] `GET /topics` and `GET /topics/{id}` include a `progressPercent` field
- [ ] Progress bar is visible on each topic card on the dashboard
- [ ] Progress bar is visible on the topic detail view
- [ ] A topic with no resources shows 0% progress
- [ ] A topic with all resources done shows 100% progress
- [ ] Unit tests cover: no resources (0%), all done (100%), mixed states, single resource cases

## Blocked by

- #6 Resource state machine
