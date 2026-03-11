-- 1. Create the `payment_logs` table
create table public.payment_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  client_id uuid references public.clients(id) on delete cascade not null,
  client_name text not null,
  items text,
  month_paid_for text not null,
  payment15_amount jsonb,
  payment30_amount jsonb,
  status text default 'Paid',
  date_saved timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Turn on Row Level Security (RLS)
alter table public.payment_logs enable row level security;

-- 3. Create RLS Policies
create policy "Users can view their own payment logs." 
on public.payment_logs for select 
using (auth.uid() = user_id);

create policy "Users can insert their own payment logs." 
on public.payment_logs for insert 
with check (auth.uid() = user_id);

create policy "Users can update their own payment logs." 
on public.payment_logs for update 
using (auth.uid() = user_id);

create policy "Users can delete their own payment logs." 
on public.payment_logs for delete 
using (auth.uid() = user_id);
