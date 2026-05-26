# Deploy To Coolify

1. Create new `Project`: `time-tracking`
2. Create new `Resource`
3. Select `Private Repository (with GitHub App)`
4. Select GitHub App: `zhunio-coolify`
5. Select repo: `time-tracking-api`
6. Set the `Configuration`:
  - Branch: `main`
  - Build Pack: `Docker Compose`
  - Docker Compose Location: `/docker-compose.yml`
7. In `General`, Set:
  - `Name`: `time-tracking-api`
  - `Domain`: `https://time-tracking-api.example.com`
8. Set `Environment Variables`
9. Deploy

## Environment Variables

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/time_tracking?schema=public"
JWT_SECRET="replace-with-a-strong-secret"
```

