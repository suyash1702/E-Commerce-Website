# 🚨 URGENT: Fix RLS Error - Step by Step

## The Error
```
new row violates row-level security policy for table "products"
```

## Two Things to Check:

### ✅ Step 1: Verify .env File Exists

1. Check if you have a `.env` file in the project root
2. It should contain:
   ```env
   VITE_SUPABASE_URL=https://lwanxwglgthaswrgiqqv.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YW54d2dsZ3RoYXN3cmdpcXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDA0NzMsImV4cCI6MjA3ODcxNjQ3M30.lUDtqFgGm93D40u7eo88fEjmvELE-ekPXacTS9jIKpI
   ```

3. **IMPORTANT**: After creating/updating `.env`, **RESTART your dev server** (stop and start `npm run dev`)

### ✅ Step 2: Run SQL in Supabase (CRITICAL!)

**You MUST run this SQL in Supabase to fix the error:**

1. Go to: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this EXACT SQL:

```sql
-- Fix RLS Policies for Products Table
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;

-- Create SELECT policy
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- Create INSERT policy (THIS FIXES YOUR ERROR)
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Create UPDATE policy
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);
```

6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned" or similar

### ✅ Step 3: Verify It Worked

Run this query in Supabase SQL Editor to verify:

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'products';
```

You should see 3 policies:
- `Products are viewable by everyone` (SELECT)
- `Anyone can insert products` (INSERT) ← **This must exist!**
- `Anyone can update products` (UPDATE)

### ✅ Step 4: Test Again

1. **Restart your dev server** if you created/updated `.env`
2. Try adding a product again
3. It should work now!

## Still Not Working?

If you still get the error after both steps:

1. **Check browser console** - Look for any errors about missing environment variables
2. **Verify .env is loaded** - Add this temporarily to `AddProduct.tsx`:
   ```typescript
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('Anon Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
   ```
3. **Check Supabase Dashboard** - Go to Authentication → Policies and verify the policies exist

## Quick Copy-Paste SQL (Minimal Version)

If the full script doesn't work, try this minimal version:

```sql
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);
```

