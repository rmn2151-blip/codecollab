"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreateGroupForm } from "@/components/groups/CreateGroupForm";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-lg px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Create a Group</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateGroupForm restaurants={restaurants} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
