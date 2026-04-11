"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user: { email?: string; user_metadata?: { display_name?: string } } | null;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
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
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
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
