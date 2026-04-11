"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data: groupData } = await supabase
      .from("groups")
      .select("*, restaurants(name, accepts_flex_dollars)")
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

  // Real-time messages
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
          setMessages((prev) => [
            ...prev,
            { ...payload.new, profiles: profile } as any,
          ]);
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
          // Reload members on any change
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
      <>
        <Navbar user={user} />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Status banner */}
        {isClosed && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-center text-sm text-red-700">
            This group has been closed. {group?.closed_at ? "The order has been placed." : "Time expired."}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[1fr_280px]">
          {/* Chat panel */}
          <div className="flex flex-col rounded-lg border" style={{ height: "calc(100vh - 200px)" }}>
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h1 className="font-bold">{group?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {group?.restaurants?.name}
                </p>
              </div>
              <Badge variant={isClosed ? "destructive" : "default"}>
                {group?.status}
              </Badge>
            </div>
            <ChatWindow
              messages={messages}
              currentUserId={user?.id || ""}
              onSendMessage={handleSendMessage}
              disabled={isClosed}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h2 className="font-semibold mb-3">
                Members ({members.length}/{group?.max_members})
              </h2>
              <ul className="space-y-2">
                {members.map((m) => (
                  <li key={m.user_id} className="flex items-center justify-between text-sm">
                    <span>{m.profiles?.display_name || "Unknown"}</span>
                    {m.role === "leader" && (
                      <Badge variant="secondary" className="text-xs">Leader</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {group?.dietary_restrictions?.length > 0 && (
              <div className="rounded-lg border p-4">
                <h2 className="font-semibold mb-2">Dietary</h2>
                <div className="flex flex-wrap gap-1">
                  {group.dietary_restrictions.map((d: string) => (
                    <Badge key={d} variant="outline">{d}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              {isLeader && !isClosed && (
                <Dialog>
                  <DialogTrigger>
                    <Button variant="destructive" className="w-full">
                      Dissolve Group
                    </Button>
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
                <Button variant="outline" className="w-full" onClick={handleLeaveGroup}>
                  Leave Group
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
