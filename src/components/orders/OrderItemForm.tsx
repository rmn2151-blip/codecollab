"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { orderItemSchema } from "@/lib/validators/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderItemFormProps {
  groupId: string;
  userId: string;
  disabled: boolean;
}

export function OrderItemForm({ groupId, userId, disabled }: OrderItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const parsed = orderItemSchema.safeParse({
      itemName: itemName.trim(),
      price: parseFloat(price),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    const { error: insertError } = await supabase.from("order_items").insert({
      group_id: groupId,
      user_id: userId,
      item_name: parsed.data.itemName,
      price: parsed.data.price,
    });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setItemName("");
    setPrice("");
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Item name"
          value={itemName}
          onChange={(e) => { setItemName(e.target.value); setError(""); }}
          disabled={disabled || isSubmitting}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0.01"
          value={price}
          onChange={(e) => { setPrice(e.target.value); setError(""); }}
          disabled={disabled || isSubmitting}
          className="w-24"
        />
        <Button type="submit" size="sm" disabled={disabled || isSubmitting || !itemName.trim() || !price}>
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}
