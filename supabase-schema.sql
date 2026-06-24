-- ============================================================
-- WPG Local Cleaners Academy — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ============================================================
-- Storage bucket for SDS PDF files (run this first)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('sds-sheets', 'sds-sheets', true)
on conflict (id) do nothing;

-- Academy Profiles: stores per-user preferences (cleaning track)
create table if not exists public.academy_profiles (
  user_id uuid references auth.users(id) on delete cascade primary key,
  cleaning_track text not null default 'both', -- 'both' | 'residential' | 'commercial'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.academy_profiles enable row level security;

create policy "Users can view own profile"
  on public.academy_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.academy_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.academy_profiles for update
  using (auth.uid() = user_id);

-- Academy Progress: tracks completion of each lesson per user
create table if not exists public.academy_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  module_slug text not null,
  lesson_slug text not null,
  completed boolean default false,
  quiz_score integer,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, module_slug, lesson_slug)
);

-- Quiz Attempts: log every quiz attempt
create table if not exists public.academy_quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  module_slug text not null,
  score integer not null,
  passed boolean not null default false,
  attempted_at timestamptz default now()
);

-- Certifications: issued when final exam is passed
create table if not exists public.academy_certifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  certification_type text not null,  -- 'academy_completion' | 'ready_to_work'
  issued_at timestamptz default now(),
  expires_at timestamptz,
  notes text,                         -- stores role type for ready_to_work ('employee' | 'contractor')
  unique(user_id, certification_type)
);

-- ============================================================
-- Row Level Security (RLS)
-- Cleaners can only read/write their OWN data
-- ============================================================

alter table public.academy_progress enable row level security;
alter table public.academy_quiz_attempts enable row level security;
alter table public.academy_certifications enable row level security;

-- Progress policies
create policy "Users can view own progress"
  on public.academy_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.academy_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.academy_progress for update
  using (auth.uid() = user_id);

-- Quiz attempt policies
create policy "Users can view own attempts"
  on public.academy_quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own attempts"
  on public.academy_quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Certification policies
create policy "Users can view own certifications"
  on public.academy_certifications for select
  using (auth.uid() = user_id);

create policy "Users can insert own certifications"
  on public.academy_certifications for insert
  with check (auth.uid() = user_id);

create policy "Users can update own certifications"
  on public.academy_certifications for update
  using (auth.uid() = user_id);

-- ============================================================
-- Manager oversight: service role can read all records
-- (The ops portal uses service role key to view all cleaners)
-- No additional policies needed — service role bypasses RLS
-- ============================================================

-- ============================================================
-- RPC: get_academy_status_by_emails
-- Used by the ops portal to show academy progress per cleaner.
-- Call with: supabase.rpc('get_academy_status_by_emails', { emails: ['a@b.com', ...] })
-- Returns one row per email with certified + ready_to_work booleans.
-- ============================================================
create or replace function public.get_academy_status_by_emails(emails text[])
returns table (
  email text,
  academy_certified boolean,
  ready_to_work boolean,
  role_type text,
  certified_at timestamptz,
  signed_off_at timestamptz
)
language sql
security definer
as $$
  select
    au.email,
    bool_or(cert.certification_type = 'academy_completion') as academy_certified,
    bool_or(cert.certification_type = 'ready_to_work')      as ready_to_work,
    max(case when cert.certification_type = 'ready_to_work' then cert.notes end) as role_type,
    max(case when cert.certification_type = 'academy_completion' then cert.issued_at end) as certified_at,
    max(case when cert.certification_type = 'ready_to_work' then cert.issued_at end) as signed_off_at
  from auth.users au
  left join public.academy_certifications cert on cert.user_id = au.id
  where au.email = any(emails)
  group by au.email;
$$;

-- Grant execute to authenticated and service_role
grant execute on function public.get_academy_status_by_emails(text[]) to authenticated, service_role;
