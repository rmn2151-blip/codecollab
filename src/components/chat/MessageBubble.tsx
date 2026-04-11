"use client";

interface MessageBubbleProps {
  senderName: string;
  content: string;
  createdAt: string;
  isOwnMessage: boolean;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = Date.now();
  const diffMinutes = Math.floor((now - date.getTime()) / 60000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
  return date.toLocaleDateString();
}

export function MessageBubble({
  senderName,
  content,
  createdAt,
  isOwnMessage,
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-3 py-2 ${
          isOwnMessage
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold mb-1">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {formatTime(createdAt)}
        </p>
      </div>
    </div>
  );
}
