-- Run the following SQL exactly as provided in your Supabase SQL Editor.

-- 1. Create the `clients` table
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  items text,
  date text,
  month text,
  "startMonth" text,
  "monthsToPay" integer,
  "monthsPaid" integer,
  payment15 jsonb,
  payment30 jsonb,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Turn on Row Level Security (RLS) so users can only access their own data
alter table public.clients enable row level security;

-- 3. Create RLS Policies
create policy "Users can view their own clients." 
on public.clients for select 
using (auth.uid() = user_id);

create policy "Users can insert their own clients." 
on public.clients for insert 
with check (auth.uid() = user_id);

create policy "Users can update their own clients." 
on public.clients for update 
using (auth.uid() = user_id);

create policy "Users can delete their own clients." 
on public.clients for delete 
using (auth.uid() = user_id);
