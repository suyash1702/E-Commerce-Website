-- ============================================
-- FIX: Row Level Security Policy for INSERT
-- Run this in Supabase SQL Editor to fix the error:
-- "new row violates row-level security policy for table 'products'"
-- ============================================

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;

-- Create INSERT policy - allows anyone to insert products
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Create UPDATE policy - allows anyone to update products
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

