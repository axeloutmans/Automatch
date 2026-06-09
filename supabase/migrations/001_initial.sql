-- AutoMatch — Initial Schema

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- fuzzy text search

-- ─── PROFILES (consumers) ───────────────────────────────────────────────────
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  email       text not null unique,
  phone       text,
  postcode    text,
  phone_public boolean default false,
  email_verified boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can read/update their own profile"
  on profiles for all using (auth.uid() = id);

-- ─── DEALERS ────────────────────────────────────────────────────────────────
create table dealers (
  id            uuid primary key references auth.users(id) on delete cascade,
  company_name  text not null,
  email         text not null unique,
  phone         text,
  kvk           text unique,
  rdw_erkend    boolean default false,
  postcode      text,
  city          text,
  logo_url      text,
  verified      boolean default false,
  -- Preferences
  radius_km     int default 75,
  brand_filters text[] default '{}',  -- empty = all brands
  plan          text default 'starter' check (plan in ('starter','pro','enterprise')),
  credits       int default 5,
  -- Stats
  rating        numeric(3,2) default 0,
  review_count  int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table dealers enable row level security;
create policy "Dealers can read/update their own record"
  on dealers for all using (auth.uid() = id);
create policy "Verified dealers visible to all"
  on dealers for select using (verified = true);

-- ─── LEADS ──────────────────────────────────────────────────────────────────
create table leads (
  id                uuid primary key default uuid_generate_v4(),
  consumer_id       uuid references profiles(id) on delete cascade not null,
  -- Vehicle
  brands            text[] not null,
  models            text[],
  body_types        text[],
  fuel_types        text[],
  transmissions     text[],
  -- Budget
  price_min         int,
  price_max         int,
  year_min          int,
  year_max          int,
  mileage_max       int,
  power_min         int,
  power_max         int,
  -- Options
  must_have_options text[] default '{}',
  nice_to_have_options text[] default '{}',
  -- Trade-in
  has_trade_in      boolean default false,
  trade_in_license  text,
  trade_in_mileage  int,
  trade_in_remarks  text,
  -- Intent
  buy_intent        text not null,
  postcode          text not null,
  -- Status
  status            text default 'active' check (status in ('active','paused','expired','fulfilled')),
  email_verified    boolean default false,
  share_phone       boolean default false,
  expires_at        timestamptz default now() + interval '90 days',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);
alter table leads enable row level security;
create policy "Consumers manage own leads"
  on leads for all using (auth.uid() = consumer_id);
create policy "Verified dealers can read active leads"
  on leads for select
  using (
    status = 'active'
    and email_verified = true
    and exists (select 1 from dealers where id = auth.uid() and verified = true)
  );

-- ─── LEAD OPENS (credit ledger) ─────────────────────────────────────────────
create table lead_opens (
  id          uuid primary key default uuid_generate_v4(),
  lead_id     uuid references leads(id) on delete cascade not null,
  dealer_id   uuid references dealers(id) on delete cascade not null,
  exclusive   boolean default false,
  credits_used int default 1,
  opened_at   timestamptz default now(),
  unique(lead_id, dealer_id)
);
alter table lead_opens enable row level security;
create policy "Dealers see their own opens"
  on lead_opens for all using (auth.uid() = dealer_id);

-- ─── OFFERS ─────────────────────────────────────────────────────────────────
create table offers (
  id            uuid primary key default uuid_generate_v4(),
  lead_id       uuid references leads(id) on delete cascade not null,
  dealer_id     uuid references dealers(id) on delete cascade not null,
  -- Car details
  car_title     text not null,
  year          int,
  mileage       int,
  fuel          text,
  transmission  text,
  price         int not null,
  -- Match
  match_score   int not null check (match_score between 0 and 100),
  must_have_hit text[] default '{}',
  must_have_miss text[] default '{}',
  nice_to_have_hit text[] default '{}',
  extras        text,
  message       text,
  -- Status
  status        text default 'sent' check (status in ('sent','read','accepted','rejected')),
  created_at    timestamptz default now()
);
alter table offers enable row level security;
create policy "Dealers manage their own offers"
  on offers for all using (auth.uid() = dealer_id);
create policy "Consumers see offers on their leads"
  on offers for select
  using (exists (select 1 from leads where id = lead_id and consumer_id = auth.uid()));
create policy "Consumers update offer status"
  on offers for update
  using (exists (select 1 from leads where id = lead_id and consumer_id = auth.uid()));

-- ─── MESSAGES ───────────────────────────────────────────────────────────────
create table messages (
  id          uuid primary key default uuid_generate_v4(),
  offer_id    uuid references offers(id) on delete cascade not null,
  sender_id   uuid references auth.users(id) on delete cascade not null,
  sender_role text not null check (sender_role in ('consumer','dealer')),
  body        text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);
alter table messages enable row level security;
create policy "Parties in conversation can read/write messages"
  on messages for all
  using (
    auth.uid() = sender_id
    or exists (
      select 1 from offers o
      join leads l on l.id = o.lead_id
      where o.id = offer_id
        and (o.dealer_id = auth.uid() or l.consumer_id = auth.uid())
    )
  );

-- ─── CREDIT TRANSACTIONS ────────────────────────────────────────────────────
create table credit_transactions (
  id          uuid primary key default uuid_generate_v4(),
  dealer_id   uuid references dealers(id) on delete cascade not null,
  amount      int not null,   -- positive = purchase, negative = spend
  reason      text not null,  -- 'purchase', 'lead_open', 'refund'
  stripe_payment_id text,
  meta        jsonb,
  created_at  timestamptz default now()
);
alter table credit_transactions enable row level security;
create policy "Dealers see own transactions"
  on credit_transactions for select using (auth.uid() = dealer_id);

-- ─── DEALER REVIEWS ─────────────────────────────────────────────────────────
create table dealer_reviews (
  id          uuid primary key default uuid_generate_v4(),
  dealer_id   uuid references dealers(id) on delete cascade not null,
  consumer_id uuid references profiles(id) on delete cascade not null,
  offer_id    uuid references offers(id) on delete cascade not null,
  rating      int not null check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now(),
  unique(offer_id, consumer_id)
);
alter table dealer_reviews enable row level security;
create policy "Reviews are publicly readable"
  on dealer_reviews for select using (true);
create policy "Consumers write their own reviews"
  on dealer_reviews for insert with check (auth.uid() = consumer_id);

-- ─── FUNCTIONS & TRIGGERS ───────────────────────────────────────────────────

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger trg_dealers_updated_at before update on dealers
  for each row execute function set_updated_at();
create trigger trg_leads_updated_at before update on leads
  for each row execute function set_updated_at();

-- Recalculate dealer rating after review insert
create or replace function recalc_dealer_rating()
returns trigger language plpgsql security definer as $$
begin
  update dealers
  set rating = (select round(avg(rating)::numeric, 2) from dealer_reviews where dealer_id = new.dealer_id),
      review_count = (select count(*) from dealer_reviews where dealer_id = new.dealer_id)
  where id = new.dealer_id;
  return new;
end; $$;
create trigger trg_dealer_rating after insert or update on dealer_reviews
  for each row execute function recalc_dealer_rating();

-- Auto-expire leads
create or replace function expire_old_leads()
returns void language plpgsql security definer as $$
begin
  update leads set status = 'expired'
  where status = 'active' and expires_at < now();
end; $$;

-- ─── INDEXES ────────────────────────────────────────────────────────────────
create index idx_leads_status on leads(status);
create index idx_leads_consumer on leads(consumer_id);
create index idx_leads_brands on leads using gin(brands);
create index idx_offers_lead on offers(lead_id);
create index idx_offers_dealer on offers(dealer_id);
create index idx_messages_offer on messages(offer_id);
create index idx_credit_tx_dealer on credit_transactions(dealer_id);
