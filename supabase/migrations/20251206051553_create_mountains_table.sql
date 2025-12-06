/*
  # Create Mountains Database

  1. New Tables
    - `mountains`
      - `id` (text, primary key) - Unique identifier (e.g., "everest")
      - `name` (text) - Mountain name
      - `height` (integer) - Height in meters
      - `unit` (text) - Measurement unit (default: "meters")
      - `prominence` (integer) - Topographic prominence
      - `range` (text) - Mountain range name
      - `country` (jsonb) - Array of countries
      - `coordinates` (jsonb) - Latitude and longitude object
      - `first_ascent` (jsonb) - First ascent information
      - `difficulty` (text) - Climbing difficulty
      - `description` (text) - Description
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `mountains` table
    - Add public read access policy (anyone can read mountain data)
    - Only authenticated users with service role can modify data
*/

CREATE TABLE IF NOT EXISTS mountains (
  id text PRIMARY KEY,
  name text NOT NULL,
  height integer NOT NULL,
  unit text DEFAULT 'meters',
  prominence integer,
  range text,
  country jsonb DEFAULT '[]'::jsonb,
  coordinates jsonb DEFAULT '{}'::jsonb,
  first_ascent jsonb DEFAULT '{}'::jsonb,
  difficulty text,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mountains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read mountains"
  ON mountains
  FOR SELECT
  USING (true);

CREATE POLICY "Only service role can insert mountains"
  ON mountains
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Only service role can update mountains"
  ON mountains
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only service role can delete mountains"
  ON mountains
  FOR DELETE
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS idx_mountains_country ON mountains USING gin(country);
CREATE INDEX IF NOT EXISTS idx_mountains_height ON mountains(height);
CREATE INDEX IF NOT EXISTS idx_mountains_range ON mountains(range);
