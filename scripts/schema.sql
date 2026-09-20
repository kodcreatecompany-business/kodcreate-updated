CREATE TABLE IF NOT EXISTS kodcreate_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL DEFAULT 'kodcreate',
  request_id uuid NOT NULL UNIQUE,
  payload_hash text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  business_name text,
  description text NOT NULL,
  budget text,
  timeline text,
  email_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kodcreate_submission_limits (
  key text PRIMARY KEY,
  "userId" text NOT NULL DEFAULT 'kodcreate',
  count integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL
);
