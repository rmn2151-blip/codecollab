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

export default function GroupsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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

      // Auto-apply user's saved dietary restrictions as default filter
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("dietary_restrictions")
          .eq("id", user.id)
          .single();
        if (profile?.dietary_restrictions?.length > 0) {
          setFilters((prev) => ({ ...prev, dietary: profile.dietary_restrictions }));
        }
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

      // Client-side filter for dietary restrictions (array overlap)
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
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Find a Group</h1>
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <GroupFilters
            restaurants={restaurants}
            filters={filters}
            onFilterChange={setFilters}
          />
          <div>
            {loading ? (
              <p className="text-muted-foreground">Loading groups...</p>
            ) : groups.length === 0 ? (
              <p className="text-muted-foreground">No groups found. Try adjusting your filters or create a new group!</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
