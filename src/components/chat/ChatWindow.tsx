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
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No messages yet — start the conversation!
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            senderName={msg.profiles?.display_name || "Unknown"}
            content={msg.content}
            createdAt={msg.created_at}
            isOwnMessage={msg.sender_id === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={onSendMessage} disabled={disabled} />
    </div>
  );
}
