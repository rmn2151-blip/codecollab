"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleDelete() {
    const supabase = createClient();
    await supabase.from("order_items").delete().eq("id", id);
    setConfirmOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between text-sm py-1">
        <span className="truncate flex-1">{itemName}</span>
        <div className="flex items-center gap-2 ml-2">
          <span className="font-mono">{formatCurrency(price)}</span>
          {isOwn && !disabled && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Delete item"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
              onClick={() => setConfirmOpen(true)}
            >
              &times;
            </Button>
          )}
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove item?</DialogTitle>
            <DialogDescription>
              &ldquo;{itemName}&rdquo; will be removed from your order. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
