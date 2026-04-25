"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreateGroupForm } from "@/components/groups/CreateGroupForm";
import { Navbar } from "@/components/layout/Navbar";

const COLORS = {
  pageBg: "#F5EFE4",
  cardBg: "#FEFCF6",
  olive: "#4A5332",
  oliveLight: "#7F8A5C",
  activeBg: "#F0EAD6",
  terracotta: "#E8C4A8",
  border: "#E5DFC9",
  ink: "#1F1A10",
  inkSoft: "#7A7158",
};

export default function NewGroupPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data } = await supabase
        .from("restaurants")
        .select("id, name")
        .order("name");
      setRestaurants(data || []);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.pageBg, fontFamily: "var(--font-fredoka)" }}>
      <Navbar user={user} />

      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Main card that contains everything */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            backgroundColor: COLORS.cardBg,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="grid md:grid-cols-[1fr_1.3fr]">
            {/* LEFT — Hero section with illustration */}
            <div
              className="p-10 relative flex flex-col justify-between min-h-[600px]"
              style={{ backgroundColor: COLORS.cardBg }}
            >
              {/* Title */}
              <div className="relative z-10">
                <h1
                  className="text-5xl font-bold leading-tight mb-4"
                  style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}
                >
                  Create a
                  <br />
                  <span style={{ color: COLORS.olive }}>group order.</span>
                </h1>
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: COLORS.inkSoft }}
                >
                  Bring your people together, choose a restaurant, and place one order everyone will love.
                </p>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-40 right-14 grid grid-cols-7 gap-1.5 opacity-50 pointer-events-none">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: COLORS.terracotta }}
                  />
                ))}
              </div>

              {/* Illustration - shopping bag with people icon */}
              <div className="relative z-10 flex items-end justify-center flex-1 -mt-4 mb-4">
                <svg viewBox="0 0 320 260" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
                  {/* Background blobs */}
                  <ellipse cx="80" cy="200" rx="70" ry="40" fill="#D4C4B0" opacity="0.5" />
                  <ellipse cx="220" cy="210" rx="90" ry="35" fill="#E8C4A8" opacity="0.5" />
                  <ellipse cx="160" cy="195" rx="110" ry="50" fill="#B8C89B" opacity="0.4" />

                  {/* Motion lines top left */}
                  <line x1="60" y1="70" x2="80" y2="55" stroke={COLORS.ink} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="50" y1="85" x2="75" y2="80" stroke={COLORS.ink} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="75" y1="100" x2="95" y2="100" stroke={COLORS.ink} strokeWidth="2.5" strokeLinecap="round" />

                  {/* Shopping bag body */}
                  <path
                    d="M 110 100 L 210 100 L 225 230 L 95 230 Z"
                    fill={COLORS.olive}
                    stroke={COLORS.ink}
                    strokeWidth="1.5"
                  />

                  {/* Bag top fold */}
                  <path
                    d="M 110 100 L 115 85 L 205 85 L 210 100 Z"
                    fill="#3A4326"
                    stroke={COLORS.ink}
                    strokeWidth="1.5"
                  />

                  {/* Handles */}
                  <path
                    d="M 130 85 Q 130 55 160 55 Q 190 55 190 85"
                    fill="none"
                    stroke={COLORS.ink}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* People icon circle (white circle on bag) */}
                  <circle cx="160" cy="165" r="30" fill="white" />

                  {/* People icon */}
                  <g transform="translate(160, 165)" fill={COLORS.olive}>
                    <circle cx="-10" cy="-6" r="5" />
                    <circle cx="10" cy="-6" r="5" />
                    <circle cx="0" cy="-10" r="6" />
                    <path d="M -18 5 Q -18 -2 -10 -2 L 10 -2 Q 18 -2 18 5 L 18 12 L -18 12 Z" />
                  </g>
                </svg>
              </div>

              {/* Tip card at bottom */}
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-3 relative z-10"
                style={{ backgroundColor: "white", border: `1px solid ${COLORS.border}` }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS.activeBg }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="text-sm leading-snug" style={{ color: COLORS.ink }}>
                  The easiest way to order
                  <br />
                  together and split fairly.
                </p>
              </div>
            </div>

            {/* RIGHT — The form */}
            <div className="p-10" style={{ backgroundColor: "#FAF5E8" }}>
              <CreateGroupForm restaurants={restaurants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

