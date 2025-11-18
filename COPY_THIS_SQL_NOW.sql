-- ============================================
-- COPY THIS ENTIRE FILE AND PASTE INTO SUPABASE SQL EDITOR
-- This will fix the "new row violates row-level security policy" error
-- ============================================

-- Remove any existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;

-- Create the INSERT policy (THIS IS THE FIX!)
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Create the UPDATE policy
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Verify it worked (you should see 2-3 policies listed)
SELECT policyname, cmd as operation
FROM pg_policies 
WHERE tablename = 'products'
ORDER BY policyname;

