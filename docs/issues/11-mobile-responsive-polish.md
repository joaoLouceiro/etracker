## What to build

Responsive layout audit and fixes across all views: dashboard, topic detail, resource detail, and notes editors. After this slice the app is comfortably usable on a phone — particularly for the high-frequency mobile action of adding a resource on the go.

## Acceptance criteria

- [ ] Dashboard is usable at 375px viewport width (iPhone SE baseline) with no horizontal overflow
- [ ] "Add resource" form is reachable and submittable on mobile with one thumb
- [ ] Topic detail view (resource list + progress bar) is readable and interactive on mobile
- [ ] Notes editors are usable on a mobile keyboard (no viewport-resize bugs with the soft keyboard)
- [ ] Touch targets (buttons, state toggles) meet 44×44px minimum
- [ ] No fixed-width elements that break the layout on small screens
- [ ] Tested in browser devtools at 375px, 390px (iPhone 14), and 412px (Pixel 7) viewports

## Blocked by

- #3 Topic CRUD + dashboard shell
- #5 Add resource + URL title fetch
- #6 Resource state machine
- #7 Topic progress bar
- #8 Topic close & reopen
- #9 Notes
- #10 Resource ordering & deletion
