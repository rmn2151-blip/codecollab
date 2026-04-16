-- Add tip and delivery fee fields to groups
-- Leader can set these after the order is placed
-- Both are split equally among members who have order items

ALTER TABLE groups
  ADD COLUMN tip NUMERIC(8,2) DEFAULT 0 CHECK (tip >= 0),
  ADD COLUMN delivery_fee NUMERIC(8,2) DEFAULT 0 CHECK (delivery_fee >= 0);
