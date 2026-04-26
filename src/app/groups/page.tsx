"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GroupCard } from "@/components/groups/GroupCard";
import { GroupFilters } from "@/components/groups/GroupFilters";
import { Navbar } from "@/components/layout/Navbar";

interface Group {
  id: string;
  name: string;
  max_members: number;
  dietary_restrictions: string[];
  order_deadline: string;
  status: string;
  restaurants: { id: string; name: string; accepts_flex_dollars: boolean };
  group_members: { user_id: string }[];
}

interface Restaurant {
  id: string;
  name: string;
}

interface RecentUser {
  display_name: string;
  initials: string;
}

// Soft pastel palette for the avatar circles — picks a stable color per-initial-pair.
const AVATAR_COLORS = [
  { bg: "#F5E6D3", fg: "#8B6F47" }, // warm cream
  { bg: "#E5D4B8", fg: "#7A5A3A" }, // tan
  { bg: "#EBD9C4", fg: "#6B5238" }, // soft beige
  { bg: "#DFE5C9", fg: "#5A6B2F" }, // sage
  { bg: "#E8DCC4", fg: "#6B5B3A" }, // wheat
  { bg: "#F0E0D0", fg: "#7A5F42" }, // dusty peach
];

function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorForInitials(initials: string) {
  // Deterministic hash → pick a color from the palette
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = (hash + initials.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

export default function GroupsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    restaurant: "",
    dietary: [] as string[],
    flexDollars: false,
    deadline: "",
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("dietary_restrictions")
          .eq("id", user.id)
          .single();
        if (profile?.dietary_restrictions?.length > 0) {
          setFilters((prev) => ({ ...prev, dietary: profile!.dietary_restrictions }));
        }
      }

      // Pull up to 4 most recently signed-up users for the "More people, lower fees" card
      const { data: recentData } = await supabase
        .from("profiles")
        .select("display_name, created_at")
        .order("created_at", { ascending: false })
        .limit(4);

      if (recentData) {
        setRecentUsers(
          recentData
            .filter((u: any) => u.display_name)
            .map((u: any) => ({
              display_name: u.display_name,
              initials: getInitials(u.display_name),
            }))
        );
      }

      const { data: restaurantData } = await supabase
        .from("restaurants")
        .select("id, name")
        .order("name");
      setRestaurants(restaurantData || []);

      let query = supabase
        .from("groups")
        .select("*, restaurants(*), group_members(user_id)")
        .eq("status", "open")
        .order("order_deadline", { ascending: true });

      if (filters.restaurant) {
        query = query.eq("restaurant_id", filters.restaurant);
      }
      if (filters.flexDollars) {
        query = query.eq("restaurants.accepts_flex_dollars", true);
      }
      if (filters.deadline) {
        query = query.lte("order_deadline", filters.deadline);
      }

      const { data } = await query;
      let filtered = data || [];

      if (filters.dietary.length > 0) {
        filtered = filtered.filter((g) =>
          filters.dietary.every((d) => g.dietary_restrictions.includes(d))
        );
      }

      setGroups(filtered);
      setLoading(false);
    }
    load();
  }, [filters]);

  async function handleJoin(groupId: string) {
    const { error } = await supabase.rpc("join_group", { p_group_id: groupId });
    if (error) {
      alert(error.message);
      return;
    }
    router.push(`/groups/${groupId}`);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E6", fontFamily: "var(--font-fredoka)" }}>
      <Navbar user={user} />

      {/* FULL WIDTH container - no more max-w-7xl */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8 px-10 py-8">
        {/* LEFT SIDEBAR */}
        <aside>
          {/* Filters header */}
          <div className="flex items-center gap-3 mb-4">
            <h2
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Filters
            </h2>
            <div
              className="flex items-center justify-center h-8 w-8 rounded-lg border bg-white"
              style={{ borderColor: "#6B7F3A" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
            </div>
          </div>

          {/* FILTER CARD */}
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ backgroundColor: "#FDFBF5" }}
          >
            <GroupFilters
              restaurants={restaurants}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* "More people" info card */}
          <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: "#E8EBD9" }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: "#D4DBBD" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: "#4A5A28" }}>
                  More people, lower fees.
                </p>
                <p className="text-xs text-gray-600 leading-snug">
                  The more people who join your order, the less everyone pays for delivery.
                </p>
              </div>
            </div>

            {/* Dynamic initial-based avatars from real signed-up users */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex -space-x-2">
                {recentUsers.length > 0 ? (
                  recentUsers.map((u, idx) => {
                    const { bg, fg } = colorForInitials(u.initials);
                    return (
                      <div
                        key={idx}
                        title={u.display_name}
                        className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: bg, color: fg }}
                      >
                        {u.initials}
                      </div>
                    );
                  })
                ) : (
                  // Fallback placeholders if no users yet
                  <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "#F5E6D3", color: "#8B6F47" }}>
                    ?
                  </div>
                )}
              </div>
              <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white text-[10px] font-bold" style={{ backgroundColor: "#6B7F3A" }}>
                $$$
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN */}
        <main className="relative">
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 grid grid-cols-8 gap-1.5 opacity-50 pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full" style={{ backgroundColor: "#D4BFA0" }} />
            ))}
          </div>

          {/* Header */}
          <div className="mb-6 max-w-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
              Find a Group
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              Discover active group orders near you and{" "}
              <span style={{ color: "#6B7F3A" }} className="font-semibold underline decoration-1 underline-offset-2">
                join one that fits your preferences.
              </span>
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border-2 border-dashed px-6 py-10 text-center" style={{ borderColor: "#D4C9A8" }}>
              <p className="text-gray-500">Loading groups...</p>
            </div>
          ) : groups.length === 0 ? (
            <div
              className="rounded-2xl border-2 border-dashed px-8 py-10"
              style={{
                borderColor: "#D4C9A8",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="text-center">
                <div className="mx-auto mb-5 w-52">
                  <svg viewBox="0 0 400 280" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="130" r="110" fill="#E8EBD9" />
                    <g transform="translate(310, 50)">
                      <path d="M0,-10 L2,-2 L10,0 L2,2 L0,10 L-2,2 L-10,0 L-2,-2 Z" fill="#D4A574" />
                    </g>
                    <g transform="translate(115, 70)">
                      <path d="M0,-6 L1,-1 L6,0 L1,1 L0,6 L-1,1 L-6,0 L-1,-1 Z" fill="#D4A574" />
                    </g>
                    <line x1="295" y1="80" x2="305" y2="70" stroke="#E57373" strokeWidth="2" strokeLinecap="round" />
                    <line x1="300" y1="95" x2="312" y2="90" stroke="#E57373" strokeWidth="2" strokeLinecap="round" />
                    <line x1="285" y1="105" x2="295" y2="105" stroke="#E57373" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="200" cy="90" r="28" fill="#B8C89B" />
                    <g transform="translate(200, 90)" fill="#4A5A28">
                      <circle cx="-8" cy="-4" r="5" />
                      <circle cx="8" cy="-4" r="5" />
                      <circle cx="0" cy="-8" r="6" />
                      <path d="M-15,8 Q-15,2 -8,2 L8,2 Q15,2 15,8 L15,12 L-15,12 Z" />
                    </g>
                    <ellipse cx="130" cy="200" rx="50" ry="15" fill="#F5F5F0" />
                    <path d="M80,195 Q80,220 130,225 Q180,220 180,195 Z" fill="#FFFFFF" stroke="#E0DCD0" strokeWidth="1.5" />
                    <circle cx="110" cy="185" r="8" fill="#8BA968" />
                    <circle cx="125" cy="180" r="7" fill="#E5A87A" />
                    <circle cx="140" cy="185" r="8" fill="#E57373" />
                    <circle cx="155" cy="182" r="6" fill="#F4D03F" />
                    <circle cx="118" cy="175" r="5" fill="#A8C47C" />
                    <circle cx="148" cy="175" r="5" fill="#7FB069" />
                    <circle cx="132" cy="172" r="5" fill="#E8945C" />
                    <path d="M195,160 L210,230 L240,230 L255,160 Z" fill="#E8A5A5" stroke="#D48888" strokeWidth="1.5" />
                    <rect x="215" y="130" width="25" height="35" rx="2" fill="#F4C5C5" stroke="#D48888" strokeWidth="1.5" />
                    <rect x="223" y="115" width="6" height="45" fill="#7FB069" />
                    <circle cx="210" cy="210" r="3" fill="#4A3728" />
                    <circle cx="220" cy="215" r="3" fill="#4A3728" />
                    <circle cx="230" cy="210" r="3" fill="#4A3728" />
                    <circle cx="240" cy="215" r="3" fill="#4A3728" />
                    <circle cx="225" cy="220" r="3" fill="#4A3728" />
                    <path d="M270,180 L270,235 L330,235 L330,180 Z" fill="#D4A574" stroke="#A67B4E" strokeWidth="1.5" />
                    <path d="M270,180 L275,165 L325,165 L330,180 Z" fill="#C49564" stroke="#A67B4E" strokeWidth="1.5" />
                    <path d="M285,170 Q285,155 295,155 Q305,155 305,170" fill="none" stroke="#A67B4E" strokeWidth="2" />
                    <path d="M295,170 Q295,155 305,155 Q315,155 315,170" fill="none" stroke="#A67B4E" strokeWidth="2" />
                    <circle cx="300" cy="210" r="14" fill="#B8C89B" />
                    <g transform="translate(300, 210)" fill="#4A5A28">
                      <circle cx="-4" cy="-2" r="2.5" />
                      <circle cx="4" cy="-2" r="2.5" />
                      <circle cx="0" cy="-4" r="3" />
                      <path d="M-7,4 Q-7,1 -4,1 L4,1 Q7,1 7,4 L7,6 L-7,6 Z" />
                    </g>
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
                  No groups yet
                </h2>

                <p className="text-lg font-bold mb-3" style={{ color: "#6B7F3A", fontFamily: "var(--font-fredoka)" }}>
                  Be the first to start one.
                </p>

                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  Create a group, invite your friends,
                  <br />
                  and order food together in minutes.
                </p>

                <button
                  onClick={() => router.push("/groups/new")}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 font-semibold text-white transition hover:opacity-90 mb-6 text-sm"
                  style={{ backgroundColor: "#4A5A28" }}
                >
                  Create Group
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <div className="flex items-center justify-center gap-2 mb-3 max-w-md mx-auto">
                  <div className="h-px flex-1 bg-gray-200" />
                  <div className="rounded-full p-1.5" style={{ backgroundColor: "#E8EBD9" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M12 2a7 7 0 0 0-4 12.8V17h8v-2.2A7 7 0 0 0 12 2z" />
                    </svg>
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Once groups are created, they'll appear here
                  <br />
                  for others to join and order together.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  restaurantName={group.restaurants?.name || "Unknown"}
                  memberCount={group.group_members?.length || 0}
                  maxMembers={group.max_members}
                  dietaryRestrictions={group.dietary_restrictions}
                  orderDeadline={group.order_deadline}
                  acceptsFlexDollars={group.restaurants?.accepts_flex_dollars || false}
                  isMember={group.group_members?.some((m) => m.user_id === user?.id) || false}
                  onJoin={handleJoin}
                  onView={(id) => router.push(`/groups/${id}`)}
                />
              ))}
            </div>
          )}

          {/* Bottom banner */}
          <div className="mt-5 rounded-2xl px-5 py-3 flex items-center gap-4 flex-wrap" style={{ backgroundColor: "rgba(232, 235, 217, 0.5)" }}>
            <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: "#D4DBBD" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900">New to LionEats?</p>
                <p className="text-[11px] text-gray-600">
                  It's the easiest way to order together and save on delivery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-[11px] text-gray-700 font-medium">Real-time chat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span className="text-[11px] text-gray-700 font-medium">Everyone orders together</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                </svg>
                <span className="text-[11px] text-gray-700 font-medium">Split fairly</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

