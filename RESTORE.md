# ♻️ Restore

1. 🛑 Stop the application.

   ```bash
   docker compose stop time-tracking-api
   ```

2. ☁️ Restore `/opt/time-tracking-api` using the `backups` service.

3. 🗄️ Start PostgreSQL.

   ```bash
   docker compose up -d time-tracking-postgres
   ```

4. 📦 Restore the database.

   ```bash
   zstd -d /opt/time-tracking-api/backups/latest-postgres_time_tracking_time-tracking-postgres
   ```

   ```bash
   psql -U time_tracking -d time_tracking < /backups/latest-postgres_time_tracking_time-tracking-postgres.sql
   ```

5. 🚀 Start the application.

   ```bash
   docker compose up -d time-tracking-api
   ```
