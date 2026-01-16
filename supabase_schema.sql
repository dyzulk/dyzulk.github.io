-- Dyzulk Portfolio & Blog Schema (Final Fix)
-- We renamed the constraints to avoid the "already exists" error completely.

-- 1. CLEANUP (Just in case)
drop table if exists public.posts cascade;
drop table if exists public.projects cascade;
drop table if exists public.profiles cascade;

-- 2. POSTS TABLE
create table public.posts (
  id uuid not null default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text null,
  content text null,
  cover_image text null,
  tags text[] default '{}',
  published boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint posts_pkey_new primary key (id) -- Renamed
);

-- 3. PROJECTS TABLE
create table public.projects (
  id uuid not null default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text null,
  content text null,
  cover_image text null,
  gallery_images text[] default '{}',
  tech_stack text[] default '{}',
  demo_url text null,
  repo_url text null,
  featured boolean default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint projects_pkey_new primary key (id) -- Renamed
);

-- 4. PROFILES TABLE
create table public.profiles (
  id uuid references auth.users not null,
  full_name text null,
  avatar_url text null,
  bio text null,
  updated_at timestamp with time zone,
  constraint profiles_pkey_new primary key (id), -- Renamed
  constraint profiles_auth_fk foreign key (id) references auth.users (id) on delete cascade -- Renamed to profiles_auth_fk
);

-- 5. ENABLE RLS
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.profiles enable row level security;

-- 6. POLICIES
create policy "Public posts reading" on public.posts for select using (true);
create policy "Public projects reading" on public.projects for select using (true);
create policy "Public profiles reading" on public.profiles for select using (true);

create policy "Admin insert posts" on public.posts for insert to authenticated with check (true);
create policy "Admin update posts" on public.posts for update to authenticated using (true);
create policy "Admin delete posts" on public.posts for delete to authenticated using (true);

create policy "Admin insert projects" on public.projects for insert to authenticated with check (true);
create policy "Admin update projects" on public.projects for update to authenticated using (true);
create policy "Admin delete projects" on public.projects for delete to authenticated using (true);

create policy "User update own profile" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "User insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);

-- 7. INDEXES
create index posts_slug_idx_new on public.posts (slug);
create index projects_slug_idx_new on public.projects (slug);
create index posts_tags_idx_new on public.posts using gin (tags);
