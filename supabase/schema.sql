-- Base schema for the first Supabase iteration of the ZALØ portfolio.
-- Paste this into the Supabase SQL editor after creating a new project.

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique default 'primary',
  spotify_url text not null,
  apple_music_url text,
  instagram_url text not null,
  instagram_profile_image text not null,
  hero_facts jsonb not null default '[]'::jsonb,
  profile_cards jsonb not null default '[]'::jsonb,
  latest_video_youtube_id text,
  latest_video_title text,
  latest_video_note text,
  highlight_preview_title text,
  highlight_preview_url text,
  highlight_preview_start_time integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.timeline_items (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  title text not null,
  text text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  year integer not null,
  tag text not null default 'Single',
  note text not null default '',
  cover_url text not null,
  preview_url text,
  spotify_url text,
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  release_date date,
  cover_url text,
  description text not null default '',
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  variant text not null default 'default',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.site_settings (
  slug,
  spotify_url,
  apple_music_url,
  instagram_url,
  instagram_profile_image,
  hero_facts,
  profile_cards,
  latest_video_youtube_id,
  latest_video_title,
  latest_video_note,
  highlight_preview_title,
  highlight_preview_url,
  highlight_preview_start_time
)
values (
  'primary',
  'https://open.spotify.com/intl-es/artist/4dLT2geeIDFaQTqOY140qC',
  'https://music.apple.com/es/artist/zal%C3%B8/1647227091',
  'https://www.instagram.com/zalo_wav/',
  'https://scontent-mad2-1.cdninstagram.com/v/t51.82787-19/658964957_18415910443123861_8858687036493441465_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy42NTQuQzMifQ%3D%3D&_nc_ohc=h29fgLxacR4Q7kNvwGHxttv&_nc_oc=AdpDJklHE9bLK5T8YqrdASy9QTI1HRhU5fGy-eUqlRBVtCYULl72TvcAmJlIkzyqAds&_nc_zt=24&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=LVohy9ObixZsPyOb81_0Rg&_nc_ss=7a20f&oh=00_Af0tf5aPh2aEKg-hOOCNdoABkVhalzywLM678jz6tH1_XQ&oe=69DF475C',
  '["Madrid, España", "Urbano / Reggaeton", "Portfolio social-first", "Spotify + Instagram"]'::jsonb,
  '[
    {"title":"Sonido","text":"Reggaeton y urbano melódico con una dirección nocturna, hooks directos y foco en el single."},
    {"title":"Identidad","text":"Proyecto visual pensado para destacar en social media, portadas, videoclips y campañas digitales."},
    {"title":"Uso","text":"Portfolio preparado para salas, festivales, colaboraciones creativas, prensa y brand-facing decks."}
  ]'::jsonb,
  'q_0uMxsUveU',
  'Último videoclip',
  'Añadido desde el enlace que compartiste para presentar la etapa visual más reciente.',
  'DarkSide',
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/35/93/2a35935c-26d1-97cb-6d9b-cbc27d95a41b/mzaf_8398050832062977486.plus.aac.p.m4a',
  8
)
on conflict (slug) do nothing;

insert into public.page_sections (
  section_key,
  display_order,
  is_visible,
  variant,
  config
)
values
  ('hero', 0, true, 'default', '{}'::jsonb),
  ('profile', 1, true, 'default', '{}'::jsonb),
  ('timeline', 2, true, 'default', '{}'::jsonb),
  ('releases', 3, true, 'default', '{}'::jsonb),
  ('video', 4, true, 'default', '{}'::jsonb),
  ('closing', 5, true, 'default', '{}'::jsonb)
on conflict (section_key) do nothing;

-- Enable RLS now so the next step is adding admin-only policies.
alter table public.site_settings enable row level security;
alter table public.timeline_items enable row level security;
alter table public.songs enable row level security;
alter table public.albums enable row level security;
alter table public.page_sections enable row level security;

drop policy if exists "public can read site settings" on public.site_settings;
create policy "public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "public can read timeline items" on public.timeline_items;
create policy "public can read timeline items"
on public.timeline_items
for select
to anon, authenticated
using (true);

drop policy if exists "public can read published songs" on public.songs;
create policy "public can read published songs"
on public.songs
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "public can read published albums" on public.albums;
create policy "public can read published albums"
on public.albums
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "public can read page sections" on public.page_sections;
create policy "public can read page sections"
on public.page_sections
for select
to anon, authenticated
using (true);


-- Next step: add authenticated admin write policies tied to your user id.
