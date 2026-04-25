"use client";

import { useState } from "react";

const COLORS = {
  olive: "#4A5A28",
  oliveLight: "#6B7F3A",
  cardBg: "#FDFBF5",
  border: "#E5DFC9",
  ink: "#1F1A10",
  inkSoft: "#7A7158",
};

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setContent("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-3"
      style={{ borderTop: `1px solid ${COLORS.border}`, fontFamily: "var(--font-fredoka)" }}
    >
      {/* Attachment icon */}
      <button
        type="button"
        className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition hover:bg-gray-100"
        style={{ color: COLORS.inkSoft }}
        disabled={disabled}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>

      {/* Text input */}
      <input
        type="text"
        placeholder={disabled ? "Chat is closed" : "Type a message..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 px-4 py-2.5 text-sm rounded-full focus:outline-none transition disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          color: COLORS.ink,
          fontFamily: "var(--font-fredoka)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.olive)}
        onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
      />

      {/* Send button */}
      <button
        type="submit"
        disabled={disabled || !content.trim()}
        className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: COLORS.olive, color: "#FFFFFF" }}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}

