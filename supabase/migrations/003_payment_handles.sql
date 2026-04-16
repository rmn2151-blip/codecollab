-- Payment handles: let users save their Venmo username and Zelle handle
-- so group members can pay the leader with one click.

ALTER TABLE profiles
  ADD COLUMN venmo_username TEXT CHECK (
    venmo_username IS NULL
    OR (char_length(venmo_username) BETWEEN 1 AND 30
        AND venmo_username ~ '^[A-Za-z0-9_-]+$')
  ),
  ADD COLUMN zelle_handle TEXT CHECK (
    zelle_handle IS NULL
    OR char_length(zelle_handle) BETWEEN 3 AND 100
  );

COMMENT ON COLUMN profiles.venmo_username IS
  'Venmo username without the @ prefix. Used to generate venmo.com/<username> deep links.';
COMMENT ON COLUMN profiles.zelle_handle IS
  'Zelle email or phone number. Displayed to group members so they can pay via their own bank app.';
