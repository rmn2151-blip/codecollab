"use client";

const COLORS = {
  olive: "#4A5A28",
  oliveLight: "#6B7F3A",
  oliveSoft: "#E8EBD9",
  bubbleOther: "#F5F0E0",   // cream for others' messages
  bubbleOwn: "#4A5A28",     // olive for your messages
  ink: "#1F1A10",
  inkSoft: "#7A7158",
};

interface MessageBubbleProps {
  senderName: string;
  content: string;
  createdAt: string;
  isOwnMessage: boolean;
  showSenderName?: boolean;  // hide name on consecutive messages from same person
  isLastInGroup?: boolean;   // show timestamp only on the last message in a group
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

function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  { bg: "#F5E6D3", fg: "#8B6F47" },
  { bg: "#E5D4B8", fg: "#7A5A3A" },
  { bg: "#EBD9C4", fg: "#6B5238" },
  { bg: "#DFE5C9", fg: "#5A6B2F" },
  { bg: "#E8DCC4", fg: "#6B5B3A" },
  { bg: "#F0E0D0", fg: "#7A5F42" },
];

function colorForInitials(initials: string) {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = (hash + initials.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

export function MessageBubble({
  senderName,
  content,
  createdAt,
  isOwnMessage,
  showSenderName = true,
  isLastInGroup = true,
}: MessageBubbleProps) {
  const initials = getInitials(senderName);
  const { bg, fg } = colorForInitials(initials);

  if (isOwnMessage) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%]">
          <div
            className="px-4 py-2.5 text-sm leading-snug shadow-sm"
            style={{
              backgroundColor: COLORS.bubbleOwn,
              color: "#FFFFFF",
              borderRadius: "18px 18px 4px 18px",
              fontFamily: "var(--font-fredoka)",
            }}
          >
            {content}
          </div>
          {isLastInGroup && (
            <p className="text-[10px] mt-1 mr-1 text-right" style={{ color: COLORS.inkSoft }}>
              {formatTime(createdAt)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-2 items-end">
      {/* Avatar slot — only show on last message in group, otherwise reserve space */}
      <div className="flex-shrink-0 w-7">
        {isLastInGroup && (
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ backgroundColor: bg, color: fg }}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="max-w-[75%]">
        {showSenderName && (
          <p className="text-[11px] font-semibold mb-1 ml-1" style={{ color: COLORS.inkSoft, fontFamily: "var(--font-fredoka)" }}>
            {senderName}
          </p>
        )}
        <div
          className="px-4 py-2.5 text-sm leading-snug shadow-sm"
          style={{
            backgroundColor: COLORS.bubbleOther,
            color: COLORS.ink,
            borderRadius: "18px 18px 18px 4px",
            fontFamily: "var(--font-fredoka)",
          }}
        >
          {content}
        </div>
        {isLastInGroup && (
          <p className="text-[10px] mt-1 ml-1" style={{ color: COLORS.inkSoft }}>
            {formatTime(createdAt)}
          </p>
        )}
      </div>
    </div>
  );
}

