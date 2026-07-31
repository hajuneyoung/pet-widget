-- Supabase SQL Editor에서 실행하세요.
-- (기존에 pets 테이블을 이미 만들었다면 아래 drop으로 먼저 정리하고 다시 실행하세요)
drop table if exists public.pets cascade;
drop table if exists public.users cascade;
drop function if exists public.signup_user(text, text, text);
drop function if exists public.login_user(text, text);

create extension if not exists pgcrypto;

-- 이름 + 비밀번호(해시)만 저장. 이메일 없음.
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
-- 정책을 하나도 만들지 않음 = 클라이언트가 테이블에 직접 접근 불가.
-- 오직 아래 signup_user / login_user 함수(SECURITY DEFINER)를 통해서만 접근 가능.

create table if not exists public.pets (
  user_id uuid primary key references public.users(id) on delete cascade,
  display_name text not null,
  color text not null default 'ginger',
  hunger int not null default 80,
  happiness int not null default 80,
  energy int not null default 80,
  last_visit timestamptz not null default now()
);

alter table public.pets enable row level security;

-- 친구끼리 보여주는 캐주얼 앱이라 펫 정보는 누구나 읽고 쓸 수 있게 허용
-- (비밀번호는 users 테이블에 별도 보관되고 절대 노출되지 않음)
drop policy if exists "펫 읽기 허용" on public.pets;
create policy "펫 읽기 허용" on public.pets for select using (true);

drop policy if exists "펫 추가 허용" on public.pets;
create policy "펫 추가 허용" on public.pets for insert with check (true);

drop policy if exists "펫 수정 허용" on public.pets;
create policy "펫 수정 허용" on public.pets for update using (true);

-- 회원가입: 이름 중복 체크 + 비밀번호 해시 저장 + 고양이 1마리 생성
create or replace function public.signup_user(p_name text, p_password text, p_color text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if exists (select 1 from public.users where name = p_name) then
    raise exception '이미 사용중인 이름이에요';
  end if;

  insert into public.users (name, password_hash)
  values (p_name, crypt(p_password, gen_salt('bf')))
  returning id into v_id;

  insert into public.pets (user_id, display_name, color)
  values (v_id, p_name, p_color);

  return v_id;
end;
$$;

-- 로그인: 이름+비밀번호 확인 후 user id 반환
create or replace function public.login_user(p_name text, p_password text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_hash text;
begin
  select id, password_hash into v_id, v_hash
  from public.users
  where name = p_name;

  if v_id is null or v_hash <> crypt(p_password, v_hash) then
    raise exception '이름 또는 비밀번호가 틀렸어요';
  end if;

  return v_id;
end;
$$;

grant execute on function public.signup_user(text, text, text) to anon;
grant execute on function public.login_user(text, text) to anon;
