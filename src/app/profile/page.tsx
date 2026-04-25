"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { DIETARY_RESTRICTIONS } from "@/lib/constants";

// Soft palette matching the mockup
const COLORS = {
  pageBg: "#F5EFE4",      // cream page background
  cardBg: "#FEFCF6",      // paper-white cards
  activeBg: "#F0EAD6",    // nav active state
  infoBg: "#F5EFE4",      // info card bg (slightly cream)
  olive: "#4A5332",       // deep olive for accents/buttons/checkboxes
  oliveLight: "#7F8A5C",  // lighter olive
  border: "#E5DFC9",      // soft warm border
  ink: "#1F1A10",         // headings / main text
  inkSoft: "#7A7158",     // secondary text / labels
};

// ————— ICONS —————
const Icon = {
  User: ({ size = 18, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Utensils: ({ size = 18, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h2v11" />
      <path d="M7 2v20" />
      <path d="M14 2a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1v9" />
    </svg>
  ),
  Card: ({ size = 18, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  Mail: ({ size = 16, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Pencil: ({ size = 14, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Check: ({ size = 12, color = "white", stroke = 3 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronDown: ({ size = 14, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Users: ({ size = 20, color = "currentColor", stroke = 2 }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    display_name: "",
    has_flex_dollars: false,
    dietary_restrictions: [] as string[],
    venmo_username: "",
    zelle_handle: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("account");
  const [showAllPrefs, setShowAllPrefs] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, has_flex_dollars, dietary_restrictions, venmo_username, zelle_handle")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile({
            display_name: data.display_name || "",
            has_flex_dollars: data.has_flex_dollars || false,
            dietary_restrictions: data.dietary_restrictions || [],
            venmo_username: data.venmo_username || "",
            zelle_handle: data.zelle_handle || "",
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
        venmo_username: profile.venmo_username.trim().replace(/^@/, "") || null,
        zelle_handle: profile.zelle_handle.trim() || null,
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectedDiets = profile.dietary_restrictions;
  const maxVisible = 5;
  const displayedDiets = showAllPrefs ? selectedDiets : selectedDiets.slice(0, maxVisible);
  const extraDiets = selectedDiets.length - maxVisible;

  // Shared styles
  const cardStyle = {
    backgroundColor: COLORS.cardBg,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)",
    border: `1px solid ${COLORS.border}`,
  };

  const navItemStyle = (section: string) => {
    const isActive = activeSection === section;
    return {
      backgroundColor: isActive ? COLORS.activeBg : "transparent",
      color: isActive ? COLORS.ink : COLORS.inkSoft,
      borderLeft: isActive ? `3px solid ${COLORS.olive}` : "3px solid transparent",
      fontWeight: isActive ? 600 : 500,
    };
  };

  // CheckBox component - visual only (not a button, to avoid nested <button> errors)
  const CheckBox = ({ checked, size = 22 }: any) => (
    <div
      className="flex items-center justify-center rounded flex-shrink-0 transition"
      style={{
        width: size,
        height: size,
        backgroundColor: checked ? COLORS.olive : "transparent",
        border: checked ? "none" : `2px solid ${COLORS.border}`,
      }}
    >
      {checked && <Icon.Check size={size * 0.6} />}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.pageBg, fontFamily: "var(--font-fredoka)" }}>
      <Navbar user={user} />

      <form onSubmit={handleSave}>
        <div className="grid md:grid-cols-[260px_1fr] gap-6 px-8 py-8 max-w-7xl mx-auto">
          {/* LEFT SIDEBAR */}
          <aside className="space-y-5">
            {/* NAV CARD */}
            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="py-4">
                <p
                  className="px-5 mb-2 text-xs uppercase font-semibold"
                  style={{ color: COLORS.inkSoft, letterSpacing: "0.18em" }}
                >
                  Settings
                </p>

                <button
                  type="button"
                  onClick={() => scrollToSection("account")}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm transition text-left"
                  style={navItemStyle("account")}
                >
                  <Icon.User size={18} />
                  <span>Account Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("food")}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm transition text-left"
                  style={navItemStyle("food")}
                >
                  <Icon.Utensils size={18} />
                  <span>Food Preferences</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("payment")}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm transition text-left"
                  style={navItemStyle("payment")}
                >
                  <Icon.Card size={18} />
                  <span>Payment Handles</span>
                </button>
              </div>
            </div>

            {/* INFO CARD - "CodeCollab makes group ordering simple" */}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: COLORS.infoBg,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#E8E0C6" }}
                >
                  <Icon.Users size={18} color={COLORS.olive} />
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}
                >
                  CodeCollab makes group ordering simple, so you can focus on what matters.
                </p>
              </div>
              <div
                className="h-0.5 w-10 ml-13"
                style={{ backgroundColor: COLORS.olive, marginLeft: "3.25rem" }}
              />
            </div>
          </aside>

          {/* RIGHT MAIN */}
          <main className="space-y-5">
            {/* PROFILE HEADER */}
            <div className="rounded-2xl p-7" style={cardStyle}>
              <div className="flex items-start gap-6 flex-wrap">
                <div className="flex-shrink-0">
                  <h1
                    className="text-3xl font-bold mb-1"
                    style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}
                  >
                    {profile.display_name || "Your Name"}
                  </h1>
                  <p className="text-sm mb-4" style={{ color: COLORS.inkSoft }}>
                    {user?.email}
                  </p>

                  {profile.has_flex_dollars && (
                    <div
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                      style={{ backgroundColor: COLORS.activeBg, color: COLORS.ink }}
                    >
                      <Icon.Card size={16} color={COLORS.olive} />
                      <span className="font-medium">Flex Dollars enabled</span>
                    </div>
                  )}
                </div>

                <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: COLORS.border }} />

                <div className="flex-1 min-w-[280px]">
                  <p
                    className="text-xs uppercase font-semibold mb-3"
                    style={{ color: COLORS.inkSoft, letterSpacing: "0.18em" }}
                  >
                    Preferences at a Glance
                  </p>
                  {selectedDiets.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {displayedDiets.map((diet) => (
                        <div
                          key={diet}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm"
                          style={{ backgroundColor: COLORS.activeBg, color: COLORS.ink }}
                        >
                          <Icon.Check size={14} color={COLORS.olive} stroke={2.5} />
                          <span className="font-medium">{diet}</span>
                        </div>
                      ))}
                      {extraDiets > 0 && !showAllPrefs && (
                        <button
                          type="button"
                          onClick={() => setShowAllPrefs(true)}
                          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                          style={{ color: COLORS.inkSoft }}
                        >
                          and {extraDiets} more <Icon.ChevronDown size={14} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm italic" style={{ color: COLORS.inkSoft }}>
                      No preferences set yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ACCOUNT DETAILS */}
            <div id="account" className="rounded-2xl p-7 scroll-mt-24" style={cardStyle}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS.activeBg }}
                >
                  <Icon.User size={20} color={COLORS.olive} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}>
                    Account Details
                  </h2>
                  <p className="text-xs" style={{ color: COLORS.inkSoft }}>
                    Update your basic account information.
                  </p>
                </div>
                {/* Edit button */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
                  style={{ borderColor: COLORS.border, color: COLORS.ink }}
                >
                  <Icon.Pencil size={13} color={COLORS.ink} />
                  Edit
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Icon.Mail size={16} color={COLORS.inkSoft} />
                    </div>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm cursor-not-allowed"
                      style={{
                        borderColor: COLORS.border,
                        backgroundColor: COLORS.pageBg,
                        color: COLORS.inkSoft,
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: COLORS.inkSoft }}>
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Icon.User size={16} color={COLORS.inkSoft} />
                    </div>
                    <input
                      type="text"
                      value={profile.display_name}
                      onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none transition"
                      style={{ borderColor: COLORS.border, backgroundColor: "white", color: COLORS.ink }}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FOOD PREFERENCES */}
            <div id="food" className="rounded-2xl p-7 scroll-mt-24" style={cardStyle}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS.activeBg }}
                >
                  <Icon.Utensils size={20} color={COLORS.olive} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}>
                    Food Preferences
                  </h2>
                  <p className="text-xs" style={{ color: COLORS.inkSoft }}>
                    Let others know what works best for you.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
                  style={{ borderColor: COLORS.border, color: COLORS.ink }}
                >
                  <Icon.Pencil size={13} color={COLORS.ink} />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {DIETARY_RESTRICTIONS.map((diet) => {
                  const isSelected = profile.dietary_restrictions.includes(diet);
                  return (
                    <button
                      type="button"
                      key={diet}
                      onClick={() => {
                        const newDietary = isSelected
                          ? profile.dietary_restrictions.filter((d) => d !== diet)
                          : [...profile.dietary_restrictions, diet];
                        setProfile({ ...profile, dietary_restrictions: newDietary });
                      }}
                      className="flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition text-left hover:bg-gray-50"
                      style={{
                        borderColor: COLORS.border,
                        backgroundColor: "white",
                      }}
                    >
                      <CheckBox checked={isSelected} size={22} />
                      <span
                        className="font-medium"
                        style={{ color: COLORS.ink }}
                      >
                        {diet}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Flex Dollars checkbox - wrapped in a label for clickability */}
              <label
                onClick={() => setProfile({ ...profile, has_flex_dollars: !profile.has_flex_dollars })}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <CheckBox checked={profile.has_flex_dollars} size={22} />
                <span
                  className="text-sm font-medium"
                  style={{ color: COLORS.ink }}
                >
                  I have Flex Dollars
                </span>
              </label>
            </div>

            {/* PAYMENT HANDLES */}
            <div id="payment" className="rounded-2xl p-7 scroll-mt-24" style={cardStyle}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS.activeBg }}
                >
                  <Icon.Card size={20} color={COLORS.olive} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold" style={{ color: COLORS.ink, fontFamily: "var(--font-fredoka)" }}>
                    Payment Handles{" "}
                    <span className="text-xs font-normal" style={{ color: COLORS.inkSoft }}>
                      (optional)
                    </span>
                  </h2>
                  <p className="text-xs" style={{ color: COLORS.inkSoft }}>
                    Shown to group members when you are the group leader.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
                  style={{ borderColor: COLORS.border, color: COLORS.ink }}
                >
                  <Icon.Pencil size={13} color={COLORS.ink} />
                  Edit
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                    Venmo Username
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: COLORS.activeBg, color: COLORS.olive }}
                    >
                      V
                    </div>
                    <input
                      type="text"
                      placeholder="your-venmo-username"
                      value={profile.venmo_username}
                      onChange={(e) => setProfile({ ...profile, venmo_username: e.target.value })}
                      className="w-full pl-11 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none transition"
                      style={{ borderColor: COLORS.border, backgroundColor: "white", color: COLORS.ink }}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                    Zelle Email or Phone
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded flex items-center justify-center text-xs font-bold italic"
                      style={{ backgroundColor: COLORS.activeBg, color: COLORS.olive }}
                    >
                      Z
                    </div>
                    <input
                      type="text"
                      placeholder="you@barnard.edu or (555) 123-4567"
                      value={profile.zelle_handle}
                      onChange={(e) => setProfile({ ...profile, zelle_handle: e.target.value })}
                      className="w-full pl-11 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none transition"
                      style={{ borderColor: COLORS.border, backgroundColor: "white", color: COLORS.ink }}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {message && (
              <div
                className="rounded-lg px-4 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: message.includes("Failed") ? "#FCE4E4" : COLORS.activeBg,
                  color: message.includes("Failed") ? "#B91C1C" : COLORS.olive,
                  border: `1px solid ${message.includes("Failed") ? "#F5C5C5" : COLORS.border}`,
                }}
              >
                {message}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-3 rounded-lg border font-semibold text-sm hover:bg-gray-50 transition"
                style={{ borderColor: COLORS.border, color: COLORS.ink, backgroundColor: "white" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-14 py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
                style={{ backgroundColor: COLORS.olive }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}

