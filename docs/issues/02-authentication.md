## What to build

End-to-end authentication: Auth0 JWT validation in Spring Security, Google OAuth and email/password login flows in the React UI, and protected routes. After this slice, a user can log in, log out, and all API requests carry a validated user identity.

## Acceptance criteria

- [ ] Spring Security validates Auth0-issued JWTs on every request; unauthenticated requests return 401
- [ ] Authenticated user ID is extractable from the security context in any request handler
- [ ] React app redirects unauthenticated users to a login page
- [ ] Login page offers Google OAuth and email/password options via Auth0 Universal Login
- [ ] After login, the React app attaches the JWT as a Bearer token on all API requests
- [ ] Logout clears the session and redirects to the login page
- [ ] Integration test: request without token → 401; request with valid token → 200

## Blocked by

- #1 Project scaffold & deployment
