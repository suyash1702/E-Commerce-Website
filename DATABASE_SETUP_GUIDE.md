# Database Setup Guide

## The Problem
You're seeing: `relation "public.products" does not exist`

This means the database tables haven't been created yet. You need to run the migrations first.

## Quick Fix: Run the Complete Setup SQL

### Step 1: Open Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Copy and Run the Setup SQL
1. Open the file `SETUP_DATABASE.sql` in this project
2. Copy **ALL** the contents
3. Paste it into the SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify Tables Were Created
After running, you should see a success message. To verify:
1. Go to **Table Editor** in the left sidebar
2. You should see three tables:
   - `categories`
   - `products`
   - `cart_items`

### Step 4: Test Adding a Product
Go back to your app and try adding a product - it should work now!

## What the Setup SQL Does

The `SETUP_DATABASE.sql` file:
1. ✅ Creates the `categories` table
2. ✅ Creates the `products` table
3. ✅ Creates the `cart_items` table
4. ✅ Enables Row Level Security (RLS)
5. ✅ Creates policies to allow reading and writing products
6. ✅ Creates indexes for better performance
7. ✅ Sets up automatic timestamp updates

## Alternative: Run Migrations Individually

If you prefer to run migrations one at a time:

1. **First migration** (creates tables):
   - File: `supabase/migrations/20251114102310_470752b0-6041-4a86-a1cc-e6f3c3b30683.sql`
   - Copy and run in SQL Editor

2. **Second migration** (adds comment):
   - File: `supabase/migrations/20251114105807_fe84c57a-8d40-45ed-b6a5-f5fa2394d00d.sql`
   - Copy and run in SQL Editor

3. **Third migration** (enables INSERT/UPDATE):
   - File: `supabase/migrations/20251115000000_enable_product_inserts.sql`
   - Copy and run in SQL Editor

## Troubleshooting

### "relation already exists" error
- This means some tables already exist
- The SQL uses `CREATE TABLE IF NOT EXISTS` so it's safe to run again
- If you get errors, you can drop tables first (be careful!):

```sql
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
```

Then run `SETUP_DATABASE.sql` again.

### Still having issues?
1. Check the browser console (F12) for detailed error messages
2. Verify your Supabase project is active
3. Make sure you're connected to the correct database

