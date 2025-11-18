-- Enable INSERT and UPDATE operations on products table
-- This allows users to add and update products through the application

-- Allow anyone to insert products (you may want to restrict this in production)
CREATE POLICY "Anyone can insert products" 
ON public.products FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update products (you may want to restrict this in production)
CREATE POLICY "Anyone can update products" 
ON public.products FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Optional: Allow anyone to delete products (uncomment if needed)
-- CREATE POLICY "Anyone can delete products" 
-- ON public.products FOR DELETE 
-- USING (true);

