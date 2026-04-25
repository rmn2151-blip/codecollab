"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

interface ChatWindowProps {
  messages: any[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const COLORS = {
  inkSoft: "#7A7158",
  divider: "#E5DFC9",
  ink: "#1F1A10",
};

function formatDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ChatWindow({
  messages,
  currentUserId,
  onSendMessage,
  disabled,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col" style={{ fontFamily: "var(--font-fredoka)" }}>
      <div className="flex-1 overflow-y-auto p-5 space-y-1">
        {messages.length === 0 && (
          <p className="text-center text-sm py-8" style={{ color: COLORS.inkSoft }}>
            No messages yet — start the conversation!
          </p>
        )}

        {messages.map((msg, idx) => {
          const prev = messages[idx - 1];
          const next = messages[idx + 1];

          // Date divider: show before this message if it's the first OR a new day vs prev
          const showDateDivider =
            !prev ||
            new Date(prev.created_at).toDateString() !==
              new Date(msg.created_at).toDateString();

          // Group messages from the same sender within a short window
          const isSameSenderAsPrev =
            prev &&
            prev.sender_id === msg.sender_id &&
            !showDateDivider &&
            // within 2 minutes
            new Date(msg.created_at).getTime() - new Date(prev.created_at).getTime() < 2 * 60 * 1000;

          const isSameSenderAsNext =
            next &&
            next.sender_id === msg.sender_id &&
            new Date(next.created_at).toDateString() === new Date(msg.created_at).toDateString() &&
            new Date(next.created_at).getTime() - new Date(msg.created_at).getTime() < 2 * 60 * 1000;

          return (
            <div key={msg.id}>
              {showDateDivider && (
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px" style={{ backgroundColor: COLORS.divider }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: COLORS.inkSoft }}>
                    {formatDateLabel(msg.created_at)}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: COLORS.divider }} />
                </div>
              )}
              <div className={isSameSenderAsPrev ? "mt-0.5" : "mt-3"}>
                <MessageBubble
                  senderName={msg.profiles?.display_name || "Unknown"}
                  content={msg.content}
                  createdAt={msg.created_at}
                  isOwnMessage={msg.sender_id === currentUserId}
                  showSenderName={!isSameSenderAsPrev}
                  isLastInGroup={!isSameSenderAsNext}
                />
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={onSendMessage} disabled={disabled} />
    </div>
  );
}

