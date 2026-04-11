-- ============================================
-- CodeCollab: Full Database Schema
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  has_flex_dollars BOOLEAN DEFAULT false,
  dietary_restrictions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cuisine_type TEXT,
  accepts_flex_dollars BOOLEAN DEFAULT false,
  menu_url TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Groups
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  leader_id UUID NOT NULL REFERENCES profiles(id),
  dietary_restrictions TEXT[] DEFAULT '{}',
  max_members SMALLINT NOT NULL CHECK (max_members >= 2 AND max_members <= 18),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'ordering', 'closed')),
  order_deadline TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  closed_at TIMESTAMPTZ
);

CREATE INDEX idx_groups_status ON groups(status) WHERE status = 'open';

-- Group Members
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_group_created ON messages(group_id, created_at);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles: read all, update own
CREATE POLICY "Anyone can view profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Restaurants: read all
CREATE POLICY "Anyone can view restaurants" ON restaurants FOR SELECT USING (true);

-- Groups: read all, leader can update
CREATE POLICY "Anyone can view groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create groups" ON groups FOR INSERT WITH CHECK (auth.uid() = leader_id);
CREATE POLICY "Leader can update own group" ON groups FOR UPDATE USING (auth.uid() = leader_id);

-- Group Members: read own group members, join open groups
CREATE POLICY "Anyone can view group members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Users can join groups" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON group_members FOR DELETE USING (auth.uid() = user_id);

-- Messages: read/write for group members
CREATE POLICY "Group members can view messages" ON messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM group_members WHERE group_id = messages.group_id AND user_id = auth.uid())
  );
CREATE POLICY "Group members can send messages" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (SELECT 1 FROM group_members WHERE group_id = messages.group_id AND user_id = auth.uid())
    AND EXISTS (SELECT 1 FROM groups WHERE id = messages.group_id AND status != 'closed')
  );

-- ============================================
-- RPC Functions
-- ============================================

-- Atomic join group
CREATE OR REPLACE FUNCTION join_group(p_group_id UUID)
RETURNS VOID AS $$
DECLARE
  v_status TEXT;
  v_max SMALLINT;
  v_count INT;
BEGIN
  -- Lock the group row to prevent race conditions
  SELECT status, max_members INTO v_status, v_max
  FROM groups WHERE id = p_group_id FOR UPDATE;

  IF v_status IS NULL THEN
    RAISE EXCEPTION 'Group not found';
  END IF;

  IF v_status != 'open' THEN
    RAISE EXCEPTION 'Group is not open for joining';
  END IF;

  -- Check current member count
  SELECT COUNT(*) INTO v_count FROM group_members WHERE group_id = p_group_id;

  IF v_count >= v_max THEN
    RAISE EXCEPTION 'Group is full';
  END IF;

  -- Check if already a member
  IF EXISTS (SELECT 1 FROM group_members WHERE group_id = p_group_id AND user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Already a member of this group';
  END IF;

  -- Join the group
  INSERT INTO group_members (group_id, user_id, role)
  VALUES (p_group_id, auth.uid(), 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Close group (leader only)
CREATE OR REPLACE FUNCTION close_group(p_group_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE groups
  SET status = 'closed', closed_at = now()
  WHERE id = p_group_id AND leader_id = auth.uid() AND status != 'closed';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Not authorized or group already closed';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Enable Realtime
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE groups;
ALTER PUBLICATION supabase_realtime ADD TABLE group_members;

-- ============================================
-- Seed Restaurants
-- ============================================

INSERT INTO restaurants (name, cuisine_type, accepts_flex_dollars) VALUES
  ('Chipotle', 'Mexican', true),
  ('Panda Express', 'Chinese', true),
  ('Subway', 'Sandwiches', true),
  ('Chick-fil-A', 'American', false),
  ('Pizza Hut', 'Pizza', true),
  ('Sweetgreen', 'Salads', false),
  ('Shake Shack', 'Burgers', false),
  ('Halal Guys', 'Halal', true),
  ('Panera Bread', 'Bakery/Cafe', true),
  ('Domino''s', 'Pizza', false),
  ('Five Guys', 'Burgers', false),
  ('Raising Cane''s', 'Chicken', true),
  ('Wingstop', 'Wings', false),
  ('Noodles & Company', 'Asian/Pasta', true),
  ('Blaze Pizza', 'Pizza', true),
  ('Cava', 'Mediterranean', false),
  ('Popeyes', 'Chicken', true),
  ('Thai Express', 'Thai', false),
  ('Sushi Stop', 'Japanese', false),
  ('Tandoori Bites', 'Indian', true);
