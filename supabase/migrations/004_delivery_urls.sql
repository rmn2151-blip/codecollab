-- ============================================
-- Add delivery platform URLs to restaurants
-- Replaces menu_url with Uber Eats, DoorDash, Grubhub links
-- ============================================

ALTER TABLE restaurants ADD COLUMN uber_eats_url TEXT;
ALTER TABLE restaurants ADD COLUMN doordash_url TEXT;
ALTER TABLE restaurants ADD COLUMN grubhub_url TEXT;
ALTER TABLE restaurants DROP COLUMN menu_url;
