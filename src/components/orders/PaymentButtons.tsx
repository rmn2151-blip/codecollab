"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentButtonsProps {
  /** Amount owed, in dollars (e.g. 12.50) */
  amount: number;
  /** Leader's display name, used in the payment note */
  leaderName: string;
  /** Leader's Venmo username (without the @) — pass null/undefined if not set */
  venmoUsername?: string | null;
  /** Leader's Zelle email or phone — pass null/undefined if not set */
  zelleHandle?: string | null;
  /** Optional group name to include in the payment note */
  groupName?: string;
}

/**
 * Two small "Pay" buttons shown next to a member's total owed.
 *
 * Venmo: deep-links to venmo.com/<username> with amount + note prefilled.
 *   On mobile this opens the Venmo app; on desktop it opens the web checkout.
 *   (Venmo has no P2P API — this is the standard integration pattern.)
 *
 * Zelle: opens a dialog with the leader's handle + a copy button.
 *   Zelle has no API or deep link, so the user pays through their own bank app.
 */
export function PaymentButtons({
  amount,
  leaderName,
  venmoUsername,
  zelleHandle,
  groupName,
}: PaymentButtonsProps) {
  const [zelleOpen, setZelleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Nothing to show if the leader hasn't configured any payment handle
  if (!venmoUsername && !zelleHandle) {
    return null;
  }

  const note = groupName
    ? `LionEats: ${groupName}`
    : `LionEats order`;

  // Venmo universal link — works on both mobile (opens app) and desktop (web)
  // Format: https://venmo.com/<username>?txn=pay&amount=X&note=Y
  const venmoUrl = venmoUsername
    ? `https://venmo.com/${encodeURIComponent(venmoUsername)}?txn=pay&amount=${amount.toFixed(
        2
      )}&note=${encodeURIComponent(note)}`
    : null;

  async function handleCopyZelle() {
    if (!zelleHandle) return;
    try {
      await navigator.clipboard.writeText(zelleHandle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail on insecure contexts — fall back silently
    }
  }

  return (
    <div className="flex items-center gap-1">
      {venmoUrl && (
        <a
          href={venmoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-[#3D95CE] px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-[#2e7cb0] transition-colors"
          title={`Pay ${leaderName} $${amount.toFixed(2)} via Venmo`}
        >
          Venmo
        </a>
      )}

      {zelleHandle && (
        <>
          <button
            type="button"
            onClick={() => setZelleOpen(true)}
            className="inline-flex items-center rounded-md bg-[#6D1ED4] px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-[#5818a8] transition-colors"
            title={`Pay ${leaderName} $${amount.toFixed(2)} via Zelle`}
          >
            Zelle
          </button>

          <Dialog open={zelleOpen} onOpenChange={setZelleOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pay {leaderName} via Zelle</DialogTitle>
                <DialogDescription>
                  Zelle doesn&apos;t support direct links — open your bank&apos;s
                  app and send the payment to the handle below.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-lg font-semibold">${amount.toFixed(2)}</p>
                </div>

                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Zelle handle
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-sm break-all">{zelleHandle}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyZelle}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Tip: include &ldquo;{note}&rdquo; as the memo so {leaderName}{" "}
                  knows what the payment is for.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
