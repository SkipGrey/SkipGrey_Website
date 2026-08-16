/*
# Create contact_submissions and newsletter_subscribers tables

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's contact email
  - `category` (text, not null) — inquiry type: general / software / academy / apparel
  - `subject` (text, not null) — human-readable subject derived from the chosen tab
  - `message` (text, not null) — the inquiry body
  - `status` (text, default 'new') — internal triage status
  - `created_at` (timestamptz, default now())
- `newsletter_subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- This is a public marketing site with NO sign-in screen, so the anon-key client must be
  able to INSERT submissions. Reads/updates/deletes are intentionally NOT exposed to the
  frontend — only operators with the service role can read or triage submissions.
- contact_submissions: INSERT only for anon + authenticated (anyone can submit an inquiry).
- newsletter_subscribers: INSERT only for anon + authenticated (anyone can subscribe).

3. Important Notes
- No SELECT/UPDATE/DELETE policies are created for anon/authenticated on purpose:
  submissions are write-only from the public internet. The service role bypasses RLS and
  is used on the operator side.
- `email` uniqueness on newsletter_subscribers prevents duplicate subscriptions.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  category text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "public_insert_contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "public_insert_newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
