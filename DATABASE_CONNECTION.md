# Database Connection Details

## Supabase REST API (Used by the Application)

The application uses the Supabase JS client which connects via the REST API:

- **URL**: `https://lwanxwglgthaswrgiqqv.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YW54d2dsZ3RoYXN3cmdpcXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDA0NzMsImV4cCI6MjA3ODcxNjQ3M30.lUDtqFgGm93D40u7eo88fEjmvELE-ekPXacTS9jIKpI`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YW54d2dsZ3RoYXN3cmdpcXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0MDQ3MywiZXhwIjoyMDc4NzE2NDczfQ.itQhErPUBnYonZZ--rt8wav5k-74l530HRMQKuhy7LA` ⚠️ **Keep this secret!**

> **Note**: The anon key should be set in `.env` as `VITE_SUPABASE_PUBLISHABLE_KEY`. The service role key bypasses Row Level Security and should only be used in secure server-side code.

- **Connection String**:

  ```
  postgresql://postgres:Dada@1702@db.lwanxwglgthaswrgiqqv.supabase.co:5432/postgres
  ```

- **Host**: `db.lwanxwglgthaswrgiqqv.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: `Dada@1702`
