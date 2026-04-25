"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Navbar } from "@/components/layout/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ── Palette ────────────────────────────────────────────────────────────
const COLORS = {
  pageBg: "#F5F0E6",        // cream page background
  cardBg: "#FDFBF5",        // cream cards
  olive: "#4A5A28",
  oliveLight: "#6B7F3A",
  oliveSoft: "#E8EBD9",
  oliveBadge: "#D4DBBD",
  darkCard: "#3A4326",      // dark olive for the header card
  darkCardText: "#EFEBD8",
  border: "#E5DFC9",
  ink: "#1F1A10",
  inkSoft: "#7A7158",
  dangerRed: "#B91C1C",
};

// ── Pastel palette for member initials ───────────────────────────────────
const AVATAR_COLORS = [
  { bg: "#F5E6D3", fg: "#8B6F47" },
  { bg: "#E5D4B8", fg: "#7A5A3A" },
  { bg: "#EBD9C4", fg: "#6B5238" },
  { bg: "#DFE5C9", fg: "#5A6B2F" },
  { bg: "#E8DCC4", fg: "#6B5B3A" },
  { bg: "#F0E0D0", fg: "#7A5F42" },
];

function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorForInitials(initials: string) {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = (hash + initials.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

function formatDeadline(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return isToday ? `Due Today, ${time}` : `Due ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${time}`;
}

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isLeader = group?.leader_id === user?.id;
  const isClosed = group?.status === "closed";
  const isOpen = group?.status === "open";

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data: groupData } = await supabase
      .from("groups")
      .select("*, restaurants(name, accepts_flex_dollars, uber_eats_url, doordash_url, grubhub_url)")
      .eq("id", groupId)
      .single();
    setGroup(groupData);

    const { data: memberData } = await supabase
      .from("group_members")
      .select("user_id, role, profiles(display_name, email)")
      .eq("group_id", groupId);
    setMembers(memberData || []);

    const { data: messageData } = await supabase
      .from("messages")
      .select("id, content, created_at, sender_id, profiles(display_name)")
      .eq("group_id", groupId)
      .order("created_at", { ascending: true });
    setMessages(messageData || []);

    setLoading(false);
  }, [groupId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel(`group-${groupId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `group_id=eq.${groupId}` },
        async (payload) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", payload.new.sender_id)
            .single();
          setMessages((prev) => [...prev, { ...payload.new, profiles: profile } as any]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "groups", filter: `id=eq.${groupId}` },
        (payload) => {
          setGroup((prev: any) => ({ ...prev, ...payload.new }));
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "group_members", filter: `group_id=eq.${groupId}` },
        () => {
          supabase
            .from("group_members")
            .select("user_id, role, profiles(display_name, email)")
            .eq("group_id", groupId)
            .then(({ data }) => setMembers(data || []));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  async function handleSendMessage(content: string) {
    await supabase.from("messages").insert({
      group_id: groupId,
      sender_id: user.id,
      content,
    });
  }

  async function handleLockGroup() {
    await fetch(`/api/groups/${groupId}/lock`, { method: "POST" });
  }

  async function handleDissolveGroup() {
    await supabase.rpc("close_group", { p_group_id: groupId });
  }

  async function handleLeaveGroup() {
    await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", user.id);
    router.push("/groups");
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.pageBg, fontFamily: "var(--font-fredoka)" }}>
        <Navbar user={user} />
        <div className="flex items-center justify-center py-20">
          <p style={{ color: COLORS.inkSoft }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Status info
  const statusLabel =
    group?.status === "open" ? "Open" :
    group?.status === "ordering" ? "Locked" : "Closed";
  const statusDot =
    group?.status === "open" ? "#86C04C" :
    group?.status === "ordering" ? "#E8A94A" : "#C4634A";

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.pageBg, fontFamily: "var(--font-fredoka)" }}>
      <Navbar user={user} />

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Status banner (if closed) */}
        {isClosed && (
          <div
            className="mb-4 rounded-xl p-3 text-center text-sm"
            style={{ backgroundColor: "#FCE4E4", border: "1px solid #F5C5C5", color: COLORS.dangerRed }}
          >
            This group has been closed. {group?.closed_at ? "The order has been placed." : "Time expired."}
          </div>
        )}

        {/* ═══════════════ DARK HEADER CARD ═══════════════ */}
        <div
          className="rounded-2xl px-6 py-5 mb-5 flex items-center gap-4 flex-wrap"
          style={{ backgroundColor: COLORS.darkCard, color: COLORS.darkCardText }}
        >
          {/* Circular icon */}
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={COLORS.darkCardText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                {group?.name}
              </h1>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: COLORS.oliveSoft, color: COLORS.olive }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusDot }} />
                {statusLabel}
              </span>
            </div>
            <p className="text-sm opacity-80">{group?.restaurants?.name}</p>
            {(group?.restaurants?.uber_eats_url || group?.restaurants?.doordash_url || group?.restaurants?.grubhub_url) && (
              <p className="text-xs opacity-75 mt-1">
                Order on:{" "}
                {group?.restaurants?.uber_eats_url && (
                  <a href={group.restaurants.uber_eats_url} target="_blank" rel="noreferrer" className="underline hover:opacity-100">
                    Uber Eats ↗
                  </a>
                )}
                {group?.restaurants?.doordash_url && (
                  <>
                    {" · "}
                    <a href={group.restaurants.doordash_url} target="_blank" rel="noreferrer" className="underline hover:opacity-100">
                      DoorDash ↗
                    </a>
                  </>
                )}
                {group?.restaurants?.grubhub_url && (
                  <>
                    {" · "}
                    <a href={group.restaurants.grubhub_url} target="_blank" rel="noreferrer" className="underline hover:opacity-100">
                      Grubhub ↗
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          <button
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: COLORS.darkCardText }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Group info
          </button>
        </div>

        {/* ═══════════════ MAIN GRID: chat (left) + sidebar (right) ═══════════════ */}
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* ─── CHAT PANEL ─── */}
          <div className="rounded-2xl flex flex-col overflow-hidden" style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}`, minHeight: "580px" }}>
            <ChatWindow
              messages={messages}
              currentUserId={user?.id || ""}
              onSendMessage={handleSendMessage}
              disabled={isClosed}
            />
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="space-y-4">
            {/* Group Summary */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.oliveSoft }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                </div>
                <h2 className="font-bold text-sm" style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}>
                  Group Summary
                </h2>
              </div>

              <div className="space-y-2.5 text-xs" style={{ color: COLORS.ink }}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusDot }} />
                  <span>{statusLabel}</span>
                  <span className="opacity-50">·</span>
                  <span>{members.length} / {group?.max_members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={COLORS.inkSoft} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{formatDeadline(group?.order_deadline)}</span>
                </div>
                {group?.dietary_restrictions?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.dietary_restrictions.map((d: string) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: COLORS.oliveSoft, color: COLORS.olive }}
                      >
                        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: COLORS.olive }} />
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Members */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.oliveSoft }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <h2 className="font-bold text-sm" style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}>
                  Members ({members.length}/{group?.max_members})
                </h2>
              </div>

              <ul className="space-y-2">
                {members.map((m) => {
                  const name = m.profiles?.display_name || "Unknown";
                  const initials = getInitials(name);
                  const { bg, fg } = colorForInitials(initials);
                  return (
                    <li key={m.user_id} className="flex items-center gap-2.5 text-sm">
                      <div
                        className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: bg, color: fg }}
                      >
                        {initials}
                      </div>
                      <span className="flex-1 truncate" style={{ color: COLORS.ink }}>{name}</span>
                      {m.role === "leader" && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLORS.oliveSoft, color: COLORS.olive }}
                        >
                          Leader
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {isLeader && isOpen && (
                <button
                  onClick={handleLockGroup}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold border transition hover:bg-gray-50"
                  style={{ borderColor: COLORS.border, color: COLORS.ink, backgroundColor: COLORS.cardBg }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Lock Group
                </button>
              )}
              {isLeader && !isClosed && (
                <Dialog>
                  <DialogTrigger
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold border transition hover:bg-red-50"
                    style={{ borderColor: "#F5C5C5", color: COLORS.dangerRed, backgroundColor: COLORS.cardBg }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                    </svg>
                    Dissolve Group
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dissolve this group?</DialogTitle>
                      <DialogDescription>
                        This will close the group and end the chat. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="destructive" onClick={handleDissolveGroup}>
                        Yes, dissolve group
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {!isLeader && !isClosed && (
                <button
                  onClick={handleLeaveGroup}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold border transition hover:bg-gray-50"
                  style={{ borderColor: COLORS.border, color: COLORS.ink, backgroundColor: COLORS.cardBg }}
                >
                  Leave Group
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════ BOTTOM BANNER ═══════════════ */}
        <div className="mt-5 rounded-2xl px-5 py-3 flex items-center gap-4 flex-wrap" style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
            <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.oliveBadge }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.oliveLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-xs" style={{ color: COLORS.ink }}>New to CodeCollab?</p>
              <p className="text-[11px]" style={{ color: COLORS.inkSoft }}>
                It's the easiest way to order together and save on delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.oliveLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-[11px] font-medium" style={{ color: COLORS.ink }}>Real-time chat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.oliveLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <span className="text-[11px] font-medium" style={{ color: COLORS.ink }}>Everyone orders together</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.oliveLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
              </svg>
              <span className="text-[11px] font-medium" style={{ color: COLORS.ink }}>Split fairly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

