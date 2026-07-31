-- Supabase SQL Editor에서 실행하세요.

create table if not exists public.pets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  color text not null default 'white',
  hunger int not null default 80,
  happiness int not null default 80,
  energy int not null default 80,
  last_visit timestamptz not null default now()
);

alter table public.pets enable row level security;

-- 본인 펫만 읽기/쓰기 가능
create policy "펫 읽기: 본인만" on public.pets
  for select using (auth.uid() = user_id);

create policy "펫 추가: 본인만" on public.pets
  for insert with check (auth.uid() = user_id);

create policy "펫 수정: 본인만" on public.pets
  for update using (auth.uid() = user_id);
