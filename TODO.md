# Feature TODO List

Use this file to track features we plan, build, and ship together.

## Backlog
- [ ] Add api for login/register
  - [ ] Use JWT
  - [ ] Add login endpoint
  - [ ] Add register endpoint
  - [ ] Add Auth guard for all endpoints except login
  - [ ] Restrict register endpoint only to admin users

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
