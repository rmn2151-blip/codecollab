"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DIETARY_RESTRICTIONS } from "@/lib/constants";

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    display_name: "",
    has_flex_dollars: false,
    dietary_restrictions: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, has_flex_dollars, dietary_restrictions")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile({
            display_name: data.display_name || "",
            has_flex_dollars: data.has_flex_dollars || false,
            dietary_restrictions: data.dietary_restrictions || [],
          });
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        has_flex_dollars: profile.has_flex_dollars,
        dietary_restrictions: profile.dietary_restrictions,
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Failed to save: " + error.message);
    } else {
      setMessage("Profile updated!");
    }
    setSaving(false);
  }

  if (loading) return null;

  return (
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-lg px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profile.display_name}
                  onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="flexDollars"
                  checked={profile.has_flex_dollars}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, has_flex_dollars: checked as boolean })
                  }
                />
                <label htmlFor="flexDollars" className="text-sm">
                  I have Flex Dollars
                </label>
              </div>

              <div className="space-y-2">
                <Label>Dietary Restrictions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {DIETARY_RESTRICTIONS.map((diet) => (
                    <div key={diet} className="flex items-center gap-2">
                      <Checkbox
                        id={`profile-diet-${diet}`}
                        checked={profile.dietary_restrictions.includes(diet)}
                        onCheckedChange={(checked) => {
                          const newDietary = checked
                            ? [...profile.dietary_restrictions, diet]
                            : profile.dietary_restrictions.filter((d) => d !== diet);
                          setProfile({ ...profile, dietary_restrictions: newDietary });
                        }}
                      />
                      <label htmlFor={`profile-diet-${diet}`} className="text-sm">
                        {diet}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {message && (
                <p className={`text-sm ${message.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                  {message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
