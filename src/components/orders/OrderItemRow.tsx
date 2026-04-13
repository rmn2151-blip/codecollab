"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface OrderItemRowProps {
  id: string;
  itemName: string;
  price: number;
  isOwn: boolean;
  disabled: boolean;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export function OrderItemRow({ id, itemName, price, isOwn, disabled }: OrderItemRowProps) {
  async function handleDelete() {
    const supabase = createClient();
    await supabase.from("order_items").delete().eq("id", id);
  }

  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span className="truncate flex-1">{itemName}</span>
      <div className="flex items-center gap-2 ml-2">
        <span className="font-mono">{formatCurrency(price)}</span>
        {isOwn && !disabled && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
            onClick={handleDelete}
          >
            &times;
          </Button>
        )}
      </div>
    </div>
  );
}
