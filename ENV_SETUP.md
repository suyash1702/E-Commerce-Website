# Environment Variables Setup

## Quick Setup

Create a `.env` file in the root of your project with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://lwanxwglgthaswrgiqqv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YW54d2dsZ3RoYXN3cmdpcXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDA0NzMsImV4cCI6MjA3ODcxNjQ3M30.lUDtqFgGm93D40u7eo88fEjmvELE-ekPXacTS9jIKpI
```

> **Note**: The service role key should **NOT** be stored in `.env` or exposed to the client. It bypasses Row Level Security and should only be used in secure server-side code.

## Database Connection Details

For direct PostgreSQL access (not used by the app, but useful for database tools):

- **Host**: `db.lwanxwglgthaswrgiqqv.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: `Dada@1702`

**Connection String**:
```
postgresql://postgres:Dada@1702@db.lwanxwglgthaswrgiqqv.supabase.co:5432/postgres
```

See `DATABASE_CONNECTION.md` for more details.

