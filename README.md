# Time Tracking API

Backend API for managing users, authentication, and tracked work time.

## ✨ Features

- 👥 **User Management**
  - User accounts with admin control
  - User profiles with basic personal info
- ⏰ **Time Tracking**
  - Time logs for daily work hours
- 🔑 **Authentication**
  - Login and register endpoints

## API Reference

API Reference: `{URL}/docs`

## Local Development

### Installation

```bash
npm install
```

### Environment Variables

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/time_tracking?schema=public"
JWT_SECRET="replace-with-a-strong-secret"
```

### Setup Database

```bash
# Start database
docker compose up -d

# Apply Migrations
npx prisma migrate deploy

# Create Migration
npx prisma migrate dev --name {migration_name}

# Stop database
docker compose down -v
```

### Setup App

```bash
# Start app in dev mode
npm run start

# Start app in debug mode
npm run start:debug

# Start app in prod mode
npm run start:prod

# Build the app
npm run build
```

### Test App

```bash
# Run e2e tests
npm run test

# Run e2e tests in watch mode
npm run test:watch

# e2e e2e tests in debug mode
npm run test:debug

# Run e2e coverage
npm run test:cov
```

### Run Prettier

```bash
npm run prettier
```

## Deployment

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Apply migrations
npx prisma migrate deploy

# Start the app
npm run start:prod
```
