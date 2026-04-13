-- ============================================
-- Order Items: Cost splitting per group
-- ============================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL CHECK (char_length(item_name) BETWEEN 1 AND 200),
  price NUMERIC(8,2) NOT NULL CHECK (price > 0),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_order_items_group ON order_items(group_id);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Group members can see all order items for their group
CREATE POLICY "Group members can view order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_id = order_items.group_id AND user_id = auth.uid()
    )
  );

-- Members can add items to groups that are not closed
CREATE POLICY "Group members can add order items" ON order_items
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM group_members
      WHERE group_id = order_items.group_id AND user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM groups
      WHERE id = order_items.group_id AND status != 'closed'
    )
  );

-- Users can only delete their own items while group is open
CREATE POLICY "Users can remove own order items" ON order_items
  FOR DELETE USING (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM groups
      WHERE id = order_items.group_id AND status != 'closed'
    )
  );

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
