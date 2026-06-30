# ⏰ Time Tracking API

Backend REST API for managing users, authentication, and tracked work time.

## ✨ Features

- 🔑 JWT-based authentication.
- 👥 User management.
- ⏰ Time tracking.
- 🗄️ PostgreSQL with Prisma ORM.
- 🐳 Deploy with Docker Compose or Coolify.
- ⚡ Built with Node.js 22 and NestJS.

## 🚀 Coolify

Deploy this repository as a Docker Compose service.

- 🔐 Repository Type: `Private Repository (with GitHub App)`
- 🐙 GitHub App: `zhunio-coolify`
- 🌿 Branch: `main`
- 🐳 Build Pack: `Docker Compose`
- 🔌 Application Port: `3000`
- 🗄️ Database: `PostgreSQL`
- 🔑 Environment Variables:
  - `POSTGRES_PASSWORD`
  - `JWT_SECRET`

See [DEPLOY.md](DEPLOY.md).

## ♻️ Restore

Restore consists of:

1. 🛑 Stop the application.
2. ☁️ Restore `/opt/time-tracking-api`.
3. 🗄️ Start PostgreSQL.
4. 📦 Restore the database.
5. 🚀 Start the application.

See [RESTORE.md](RESTORE.md).

## 💻 Development

```bash
# Install dependencies
npm install

# Start PostgreSQL
docker compose up -d time-tracking-postgres

# Apply database migrations
npx prisma migrate deploy

# Start the API
npm run start
```

Other commands:

```bash
docker compose down
docker compose down -v

npm run build
npm test
npm run lint
npm run format
```
