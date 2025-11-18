# How to Add Products

## Method 1: Using the Web Interface (Recommended)

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:8080`

3. **Click the "Add Product" button** on the products page

4. **Fill in the form**:
   - **Product Name** (required): e.g., "Wireless Headphones"
   - **Description** (optional): Product description
   - **Price** (required): e.g., "99.99"
   - **Stock Quantity**: Number of items in stock (default: 0)
   - **Image URL** (optional): Direct link to product image
   - **Category ID** (optional): UUID of a category (if you have categories set up)

5. **Click "Add Product"** to save

## Method 2: Using SQL (Direct Database Access)

If you have access to your Supabase SQL editor, you can insert products directly:

```sql
INSERT INTO public.products (name, description, price, stock, image_url)
VALUES 
  ('Wireless Headphones', 'Premium noise-cancelling headphones', 99.99, 50, 'https://example.com/headphones.jpg'),
  ('Smart Watch', 'Fitness tracking smartwatch', 199.99, 30, 'https://example.com/watch.jpg'),
  ('Laptop Stand', 'Ergonomic aluminum laptop stand', 49.99, 100, 'https://example.com/stand.jpg');
```

## Method 3: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor** → **products**
3. Click **Insert** → **Insert row**
4. Fill in the fields and save

## Important: Row Level Security (RLS) Policies

**If you get permission errors when adding products**, you need to enable INSERT/UPDATE policies:

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run this SQL:

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

Or use the migration file: `supabase/migrations/20251115000000_enable_product_inserts.sql`

## Sample Product Data

Here are some example products you can add:

```sql
INSERT INTO public.products (name, description, price, stock, image_url) VALUES
('Wireless Earbuds', 'Premium wireless earbuds with noise cancellation', 79.99, 100, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard', 129.99, 50, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'),
('Gaming Mouse', 'High-precision gaming mouse with customizable buttons', 59.99, 75, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and card readers', 39.99, 200, 'https://images.unsplash.com/photo-1587825141508-dc4800e5d0a7?w=500'),
('Monitor Stand', 'Adjustable dual monitor stand', 89.99, 40, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500');
```

## Troubleshooting

### "Permission denied" error
- Make sure you've run the RLS policy migration (see above)
- Check that your Supabase API key has the correct permissions

### Products not showing up
- Refresh the page
- Check the browser console for errors
- Verify the product was actually inserted in Supabase dashboard

### Image not displaying
- Make sure the image URL is a direct link (not a page URL)
- Use images from services like Unsplash, Imgur, or your own hosting
- Test the URL in a browser first to make sure it loads

