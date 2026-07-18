-- Grimm Fracture traveler ledger (public subscribe)
create table if not exists public.newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_email_unique unique (email)
);

create index if not exists newsletter_created_at_idx on public.newsletter (created_at desc);

alter table public.newsletter enable row level security;

-- Anyone can subscribe (insert only). No public read of emails.
drop policy if exists "anon_can_subscribe" on public.newsletter;
create policy "anon_can_subscribe"
  on public.newsletter
  for insert
  to anon, authenticated
  with check (true);
