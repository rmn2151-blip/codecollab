"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user: { email?: string; user_metadata?: { display_name?: string } } | null;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
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

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/groups" className="text-lg font-bold">
          CodeCollab
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/groups" className="text-sm hover:underline">
              Groups
            </Link>
            <Link href="/groups/new" className="text-sm hover:underline">
              Create Group
            </Link>
            <Link href="/profile" className="text-sm hover:underline">
              Profile
            </Link>
            <span className="text-sm text-muted-foreground">
              {user.user_metadata?.display_name || user.email}
            </span>
            <div className="flex flex-col items-end gap-0.5">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
              {logoutError && (
                <p className="text-xs text-red-500">{logoutError}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
