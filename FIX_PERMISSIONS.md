# Fix: Permission Denied Error (42501)

## The Problem
You're getting this error: `new row violates row-level security policy for table "products"`

This means your database has Row Level Security (RLS) enabled, but there's no policy allowing INSERT operations.

## The Solution

Run this SQL in your Supabase dashboard to enable adding products:

### Step 1: Go to Supabase Dashboard
1. Visit https://app.supabase.com
2. Select your project
3. Click on **SQL Editor** in the left sidebar

### Step 2: Run This SQL

```sql
-- Allow anyone to insert products
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update products
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);
```

### Step 3: Click "Run" or press Ctrl+Enter

### Step 4: Try Adding a Product Again
Go back to your app and try adding a product - it should work now!

## Alternative: Use the Migration File

You can also use the migration file I created:
- File: `supabase/migrations/20251115000000_enable_product_inserts.sql`

If you have Supabase CLI installed, you can run:
```bash
supabase db push
```

Or manually copy the SQL from that file and run it in the SQL Editor.

## Security Note

⚠️ **Important**: These policies allow ANYONE to insert/update products. For production, you should:
- Add authentication
- Restrict policies to authenticated users only
- Add role-based access control

For development/testing, the current setup is fine.

