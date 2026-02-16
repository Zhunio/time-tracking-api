# Feature TODO List

Use this file to track features we plan, build, and ship together.

## Backlog

- [ ] _None yet_

## In Progress

- [ ] _None yet_

## Done

- [x] Add prisma (ORM + migrator) with Postgres DB
- [x] Add CRUD api for users
  - [x] User info
    - [x] Email
    - [x] Password
    - [x] First Name
    - [x] Last Name
    - [x] DOB
    - [x] IsAdmin
- [x] Add CRUD api for time tracking
  - [x] TimeTracker
    - [x] User
    - [x] Date (MM/DD/YYYY)
    - [x] StartTime (HH:MM)
    - [x] EndTime (HH:MM)
- [x] Add api for login/register
  - [x] Use JWT
  - [x] Add login endpoint
  - [x] Add register endpoint
  - [x] Add Auth guard for all endpoints except login
  - [x] Restrict register endpoint only to admin users
