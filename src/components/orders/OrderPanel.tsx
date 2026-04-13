"use client";

import { useMemo } from "react";
import { OrderItemForm } from "./OrderItemForm";
import { OrderItemRow } from "./OrderItemRow";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  id: string;
  item_name: string;
  price: number;
  user_id: string;
  profiles?: { display_name: string };
}

interface Member {
  user_id: string;
  role: string;
  profiles?: { display_name: string };
}

interface OrderPanelProps {
  groupId: string;
  currentUserId: string;
  members: Member[];
  leaderId: string;
  orderItems: OrderItem[];
  isClosed: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export function OrderPanel({
  groupId,
  currentUserId,
  members,
  leaderId,
  orderItems,
  isClosed,
}: OrderPanelProps) {
  // Group items by user and calculate totals
  const { itemsByUser, totalByUser, groupTotal } = useMemo(() => {
    const itemsByUser = new Map<string, OrderItem[]>();
    const totalByUser = new Map<string, number>();

    for (const item of orderItems) {
      const userId = item.user_id;
      if (!itemsByUser.has(userId)) {
        itemsByUser.set(userId, []);
        totalByUser.set(userId, 0);
      }
      itemsByUser.get(userId)!.push(item);
      totalByUser.set(userId, totalByUser.get(userId)! + Number(item.price));
    }

    const groupTotal = Array.from(totalByUser.values()).reduce((sum, t) => sum + t, 0);

    return { itemsByUser, totalByUser, groupTotal };
  }, [orderItems]);

  // Get display name for a user
  function getDisplayName(userId: string): string {
    const member = members.find((m) => m.user_id === userId);
    return member?.profiles?.display_name || "Unknown";
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">Order Tracker</h2>

      {/* Add item form */}
      {!isClosed && (
        <OrderItemForm groupId={groupId} userId={currentUserId} disabled={isClosed} />
      )}

      {/* Items grouped by member */}
      {orderItems.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items added yet</p>
      ) : (
        <div className="space-y-3">
          {Array.from(itemsByUser.entries()).map(([userId, items]) => (
            <div key={userId} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {getDisplayName(userId)}
                  {userId === leaderId && (
                    <Badge variant="secondary" className="ml-2 text-xs">Leader</Badge>
                  )}
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(totalByUser.get(userId) || 0)}
                </span>
              </div>
              <div className="pl-2 border-l-2 border-muted">
                {items.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    id={item.id}
                    itemName={item.item_name}
                    price={Number(item.price)}
                    isOwn={item.user_id === currentUserId}
                    disabled={isClosed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group total */}
      {orderItems.length > 0 && (
        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between font-semibold">
            <span>Group Total</span>
            <span>{formatCurrency(groupTotal)}</span>
          </div>

          {/* Who owes the leader */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Who owes {getDisplayName(leaderId)}:</p>
            {Array.from(totalByUser.entries())
              .filter(([userId]) => userId !== leaderId)
              .map(([userId, total]) => (
                <div key={userId} className="flex items-center justify-between text-sm">
                  <span>{getDisplayName(userId)}</span>
                  <span className="font-mono text-orange-600">{formatCurrency(total)}</span>
                </div>
              ))}
            {Array.from(totalByUser.entries()).filter(([userId]) => userId !== leaderId).length === 0 && (
              <p className="text-xs text-muted-foreground">No other members have added items</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
