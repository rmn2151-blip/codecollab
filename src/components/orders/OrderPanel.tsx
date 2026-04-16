"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { OrderItemForm } from "./OrderItemForm";
import { OrderItemRow } from "./OrderItemRow";
import { PaymentButtons } from "./PaymentButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  isLeader: boolean;
  tip: number;
  deliveryFee: number;
  /** Group name, used in the Venmo/Zelle payment note */
  groupName?: string;
  /** Leader's Venmo username (without @) */
  leaderVenmo?: string | null;
  /** Leader's Zelle email/phone */
  leaderZelle?: string | null;
  /** Leader's display name, for button tooltips / modal title */
  leaderName?: string;
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
  isLeader,
  tip,
  deliveryFee,
  groupName,
  leaderVenmo,
  leaderZelle,
  leaderName,
}: OrderPanelProps) {
  const supabase = createClient();
  const [tipInput, setTipInput] = useState(tip > 0 ? tip.toString() : "");
  const [deliveryInput, setDeliveryInput] = useState(deliveryFee > 0 ? deliveryFee.toString() : "");
  const [saving, setSaving] = useState(false);

  // Group items by user and calculate totals
  const { itemsByUser, totalByUser, groupTotal, membersWithItems } = useMemo(() => {
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
    const membersWithItems = itemsByUser.size;

    return { itemsByUser, totalByUser, groupTotal, membersWithItems };
  }, [orderItems]);

  // Split tip + delivery equally among members who have items
  const extraPerPerson = membersWithItems > 0
    ? (Number(tip) + Number(deliveryFee)) / membersWithItems
    : 0;

  // Total each person owes = their food + their share of tip/delivery
  function totalOwed(userId: string): number {
    return (totalByUser.get(userId) || 0) + extraPerPerson;
  }

  // Get display name for a user
  function getDisplayName(userId: string): string {
    const member = members.find((m) => m.user_id === userId);
    return member?.profiles?.display_name || "Unknown";
  }

  async function handleSaveTipDelivery() {
    setSaving(true);
    await supabase
      .from("groups")
      .update({
        tip: parseFloat(tipInput) || 0,
        delivery_fee: parseFloat(deliveryInput) || 0,
      })
      .eq("id", groupId);
    setSaving(false);
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

      {/* Tip & delivery fee — leader sets these */}
      {orderItems.length > 0 && (
        <div className="border-t pt-3 space-y-3">

          {/* Leader inputs */}
          {isLeader && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Set tip & delivery:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Tip ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={tipInput}
                    onChange={(e) => setTipInput(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Delivery ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={deliveryInput}
                    onChange={(e) => setDeliveryInput(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleSaveTipDelivery}
                disabled={saving}
              >
                {saving ? "Saving..." : "Update"}
              </Button>
            </div>
          )}

          {/* Show tip/delivery breakdown to everyone if set */}
          {(Number(tip) > 0 || Number(deliveryFee) > 0) && (
            <div className="space-y-1 text-sm">
              {Number(tip) > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Tip</span>
                  <span>{formatCurrency(Number(tip))}</span>
                </div>
              )}
              {Number(deliveryFee) > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{formatCurrency(Number(deliveryFee))}</span>
                </div>
              )}
              {membersWithItems > 0 && (
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Split {membersWithItems} ways</span>
                  <span>+{formatCurrency(extraPerPerson)} each</span>
                </div>
              )}
            </div>
          )}

          {/* Group total */}
          <div className="flex items-center justify-between font-semibold border-t pt-2">
            <span>Group Total</span>
            <span>{formatCurrency(groupTotal + Number(tip) + Number(deliveryFee))}</span>
          </div>

          {/* Who owes the leader */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              Who owes {getDisplayName(leaderId)}:
            </p>
            {Array.from(totalByUser.entries())
              .filter(([userId]) => userId !== leaderId)
              .map(([userId]) => (
                <div key={userId} className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate flex-1">{getDisplayName(userId)}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-orange-600">
                      {formatCurrency(totalOwed(userId))}
                    </span>
                    {userId === currentUserId && (
                      <PaymentButtons
                        amount={totalOwed(userId)}
                        leaderName={leaderName || getDisplayName(leaderId)}
                        venmoUsername={leaderVenmo}
                        zelleHandle={leaderZelle}
                        groupName={groupName}
                      />
                    )}
                  </div>
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
