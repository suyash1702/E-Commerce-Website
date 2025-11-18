-- PROFILES TABLE FOR ROLES
-- Run this in your Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Each user can see/update only their own profile
create policy if not exists "Users can view own profile" on public.profiles
  for select
  using (auth.uid() = id);

create policy if not exists "Users can update own profile" on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Optionally allow insert from your backend if you sync profiles manually
-- (for frontend-only apps you typically manage profiles via triggers)

-- PRODUCTS RLS: everyone can read, only admins can write

alter table public.products enable row level security;

-- Public read access (catalogue is visible to all)
create policy if not exists "Anyone can read products" on public.products
  for select
  using (true);

-- Admin-only writes (insert, update, delete)
create policy if not exists "Admins can manage products" on public.products
  for all
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

-- AFTER RUNNING THIS:
-- 1. Create at least one user in Supabase Auth (Email/Password provider).
-- 2. Insert a matching profile row and mark it as admin, e.g.:
--    insert into public.profiles (id, email, role)
--    values ('<AUTH_USER_ID>', 'admin@example.com', 'admin')
--    on conflict (id) do update set role = excluded.role;
-- 3. Use that email/password in the Admin login dialog in the app.
