create extension if not exists pgcrypto;
create table requests (
  id uuid primary key default gen_random_uuid (),
  payload text null,
  ipaddress inet null,
  current_url text null,
  referring_url text null,
  request_time timestamp not null default now()
);
