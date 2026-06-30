# 🚀 Deploy to Coolify

1. 📁 Create a new project.
2. ➕ Create a new resource.
3. 🔐 Select `Private Repository (with GitHub App)`.
4. 🐙 Select GitHub App `zhunio-coolify`.
5. 📦 Select the `time-tracking-api` repository.
6. ⚙️ Configure:
   * 🌿 Branch: `main`
   * 🐳 Build Pack: `Docker Compose`
   * 📄 Docker Compose Location: `/docker-compose.yml`
7. 🏷️ Set:
   * **Name:** `time-tracking-api`
   * **Domain:** `https://time-tracking-api.example.com`
8. 💾 Verify the host backup directory:
   * `/opt/time-tracking-api/backups`
9. 🔑 Configure the required environment variables.
10. 🚀 Click **Deploy**.

## 🔑 Environment Variables

```text
POSTGRES_PASSWORD="PostgreSQL application password"
JWT_SECRET="Generate a long random secret"
```
