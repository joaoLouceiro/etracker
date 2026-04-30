## What to build

Bootstrap the full project: Spring Boot backend, React + TypeScript frontend, Postgres schema, Auth0 tenant, and EU deployment targets (Railway Frankfurt, Vercel EU, Supabase Frankfurt). Establish CI pipeline. All subsequent slices depend on this foundation being in place.

## Acceptance criteria

- [ ] Spring Boot project initialised with Spring Security, Spring Data JPA, and a Postgres datasource
- [ ] React + TypeScript project initialised with Vite (or CRA), Auth0 React SDK, and a configured API base URL
- [ ] Postgres database provisioned on Supabase (Frankfurt region)
- [ ] Auth0 tenant created in the EU region with Google OAuth and email/password connections configured
- [ ] Backend deploys to Railway (Frankfurt region) and returns 200 on a health endpoint
- [ ] Frontend deploys to Vercel (EU region) and loads in a browser
- [ ] CI pipeline runs on every push (build + test for both backend and frontend)
- [ ] All environment variables (Auth0 domain/client ID, DB URL, etc.) stored as secrets — not committed to the repo

## Blocked by

None — can start immediately.
