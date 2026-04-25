"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const COLORS = {
  navBg: "#FFFFFF",
  border: "#E5DFC9",
  olive: "#4A5A28",
  oliveLight: "#6B7F3A",
  oliveSoft: "#E8EBD9",
  ink: "#1F1A10",
  inkSoft: "#7A7158",
};

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

interface NavbarProps {
  user: { email?: string; user_metadata?: { display_name?: string } } | null;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function handleLogout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLogoutError("Failed to log out. Please try again.");
      return;
    }
    router.push("/login");
  }

  const isActive = (path: string) => {
    if (path === "/groups") {
      return pathname === "/groups" || (pathname?.startsWith("/groups/") && !pathname.startsWith("/groups/new"));
    }
    return pathname === path;
  };

  const displayName = user?.user_metadata?.display_name || user?.email || "";
  const initials = getInitials(displayName);
  const { bg: avatarBg, fg: avatarFg } = colorForInitials(initials);

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: COLORS.navBg,
        borderBottom: `1px solid ${COLORS.border}`,
        fontFamily: "var(--font-fredoka)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ── LOGO ── */}
        <Link href={user ? "/groups" : "/"} className="flex items-center gap-2">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: COLORS.oliveSoft }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-lg font-bold" style={{ color: COLORS.ink }}>
            Code<span style={{ color: COLORS.oliveLight }}>Collab</span>
          </span>
        </Link>

        {/* ── RIGHT SIDE ── */}
        {user ? (
          <div className="flex items-center gap-7">
            {/* Nav links */}
            <div className="flex items-center gap-7">
              <Link
                href="/groups"
                className="text-sm font-medium py-2 border-b-2"
                style={{
                  color: isActive("/groups") ? COLORS.olive : COLORS.inkSoft,
                  borderBottomColor: isActive("/groups") ? COLORS.olive : "transparent",
                }}
              >
                Groups
              </Link>
              <Link
                href="/groups/new"
                className="text-sm font-medium py-2 border-b-2"
                style={{
                  color: isActive("/groups/new") ? COLORS.olive : COLORS.inkSoft,
                  borderBottomColor: isActive("/groups/new") ? COLORS.olive : "transparent",
                }}
              >
                Create Group
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium py-2 border-b-2"
                style={{
                  color: isActive("/profile") ? COLORS.olive : COLORS.inkSoft,
                  borderBottomColor: isActive("/profile") ? COLORS.olive : "transparent",
                }}
              >
                Profile
              </Link>
            </div>

            {/* Divider */}
            <div className="h-7 w-px" style={{ backgroundColor: COLORS.border }} />

            {/* User chip */}
            <div className="flex items-center gap-2.5">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ backgroundColor: avatarBg, color: avatarFg }}
                title={displayName}
              >
                {initials}
              </div>
              <span className="text-sm font-medium hidden sm:inline" style={{ color: COLORS.ink }}>
                {displayName}
              </span>
            </div>

            {/* Log out button */}
            <div className="flex flex-col items-end gap-0.5">
              <button
                onClick={handleLogout}
                className="text-sm font-semibold rounded-full px-4 py-1.5 transition hover:bg-gray-50"
                style={{
                  border: `1.5px solid ${COLORS.border}`,
                  color: COLORS.ink,
                  backgroundColor: "white",
                }}
              >
                Log out
              </button>
              {logoutError && (
                <p className="text-xs text-red-500">{logoutError}</p>
              )}
            </div>
          </div>
        ) : (
          /* Logged-out state */
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold rounded-full px-5 py-2 transition hover:bg-gray-50"
              style={{
                border: `1.5px solid ${COLORS.ink}`,
                color: COLORS.ink,
                backgroundColor: "white",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold rounded-full px-5 py-2 text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORS.olive }}
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

