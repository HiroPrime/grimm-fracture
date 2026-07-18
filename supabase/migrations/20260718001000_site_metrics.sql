create table if not exists public.site_metrics (
  id int primary key default 1 check (id = 1),
  total_unique_visitors bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_metrics (id, total_unique_visitors)
values (1, 0)
on conflict (id) do nothing;

alter table public.site_metrics enable row level security;

create or replace function public.increment_unique_visitors()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_total bigint;
begin
  update public.site_metrics
  set total_unique_visitors = total_unique_visitors + 1,
      updated_at = now()
  where id = 1
  returning total_unique_visitors into new_total;
  return coalesce(new_total, 0);
end;
$$;

revoke all on function public.increment_unique_visitors() from public;
grant execute on function public.increment_unique_visitors() to service_role;
