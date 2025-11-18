-- ============================================
-- COMPLETE FIX: Row Level Security Policies for Products
-- This will fix the error: "new row violates row-level security policy for table 'products'"
-- ============================================

-- Step 1: Check current RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'products' AND schemaname = 'public';

-- Step 2: Ensure RLS is enabled (it should already be, but let's make sure)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop ALL existing policies on products table to start fresh
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.products;
DROP POLICY IF EXISTS "Enable update for all users" ON public.products;
DROP POLICY IF EXISTS "Enable select for all users" ON public.products;

-- Step 4: Create SELECT policy (for reading products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- Step 5: Create INSERT policy (for adding products) - THIS IS THE KEY FIX
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Step 6: Create UPDATE policy (for updating products)
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Step 7: Verify all policies were created successfully
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as operation,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'products' AND schemaname = 'public'
ORDER BY cmd, policyname;

-- Expected output should show 3 policies:
-- 1. SELECT policy: "Products are viewable by everyone"
-- 2. INSERT policy: "Anyone can insert products"  
-- 3. UPDATE policy: "Anyone can update products"

