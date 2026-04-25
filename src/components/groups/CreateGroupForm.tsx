"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroupSchema, type CreateGroupFormData } from "@/lib/validators/group";
import { DIETARY_RESTRICTIONS, MIN_GROUP_MEMBERS, MAX_GROUP_MEMBERS } from "@/lib/constants";

const COLORS = {
  cardBg: "#FEFCF6",
  olive: "#4A5332",
  oliveLight: "#7F8A5C",
  activeBg: "#F0EAD6",
  terracotta: "#E8C4A8",
  terracottaLight: "#F5E4D4",
  border: "#E5DFC9",
  ink: "#1F1A10",
  inkSoft: "#7A7158",
};

interface Restaurant {
  id: string;
  name: string;
}

interface CreateGroupFormProps {
  restaurants: Restaurant[];
}

export function CreateGroupForm({ restaurants }: CreateGroupFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
    dietaryRestrictions: [] as string[],
    maxMembers: 8,
    orderDeadline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = createGroupSchema.safeParse({
      ...formData,
      orderDeadline: formData.orderDeadline
        ? new Date(formData.orderDeadline).toISOString()
        : "",
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ form: data.error || "Failed to create group" });
        setLoading(false);
        return;
      }

      const { id } = await res.json();
      router.push(`/groups/${id}`);
    } catch {
      setErrors({ form: "Something went wrong" });
      setLoading(false);
    }
  }

  // Icon circle helper
  const IconBadge = ({ children, bg = COLORS.terracottaLight }: any) => (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      {children}
    </div>
  );

  // Slider percentage for fill
  const sliderPercent =
    ((formData.maxMembers - MIN_GROUP_MEMBERS) / (MAX_GROUP_MEMBERS - MIN_GROUP_MEMBERS)) * 100;

  return (
    <>
      <style jsx>{`
        /* Custom slider styling */
        .olive-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            ${COLORS.olive} 0%,
            ${COLORS.olive} ${sliderPercent}%,
            ${COLORS.border} ${sliderPercent}%,
            ${COLORS.border} 100%
          );
          outline: none;
        }
        .olive-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${COLORS.olive};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        .olive-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${COLORS.olive};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div
            className="rounded-xl px-4 py-3 text-sm font-medium"
            style={{
              backgroundColor: "#FCE4E4",
              color: "#B91C1C",
              border: "1px solid #F5C5C5",
            }}
          >
            {errors.form}
          </div>
        )}

        {/* GROUP NAME + RESTAURANT ROW */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Group Name */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <IconBadge>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </IconBadge>
              <label
                htmlFor="name"
                className="text-base font-bold"
                style={{ color: COLORS.ink, fontFamily: "Georgia, serif" }}
              >
                Group Name
              </label>
            </div>
            <input
              id="name"
              placeholder="e.g. Lunch at Chipotle"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition"
              style={{
                borderColor: COLORS.border,
                backgroundColor: "white",
                color: COLORS.ink,
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            />
            {errors.name && (
              <p className="text-xs mt-1.5" style={{ color: "#B91C1C" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Restaurant */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <IconBadge>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h2v11" />
                  <path d="M7 2v20" />
                  <path d="M14 2a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1v9" />
                </svg>
              </IconBadge>
              <label
                htmlFor="restaurant"
                className="text-base font-bold"
                style={{ color: COLORS.ink, fontFamily: "Georgia, serif" }}
              >
                Restaurant
              </label>
            </div>
            <select
              id="restaurant"
              value={formData.restaurantId}
              onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition cursor-pointer"
              style={{
                borderColor: COLORS.border,
                backgroundColor: "white",
                color: formData.restaurantId ? COLORS.ink : COLORS.inkSoft,
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.restaurantId && (
              <p className="text-xs mt-1.5" style={{ color: "#B91C1C" }}>
                {errors.restaurantId}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ backgroundColor: COLORS.border }} />

        {/* DIETARY RESTRICTIONS */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <IconBadge>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.3c1 3.4.55 6.1.14 9.2-.4 3-2.3 5.5-5 6.2S10 20 10 20" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </IconBadge>
            <div>
              <label
                className="text-base font-bold block"
                style={{ color: COLORS.ink, fontFamily: "Georgia, serif" }}
              >
                Dietary Restrictions
              </label>
              <p className="text-xs" style={{ color: COLORS.inkSoft }}>
                Select all that apply
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {DIETARY_RESTRICTIONS.map((diet) => {
              const isSelected = formData.dietaryRestrictions.includes(diet);
              return (
                <label
                  key={diet}
                  onClick={() => {
                    const newDietary = isSelected
                      ? formData.dietaryRestrictions.filter((d) => d !== diet)
                      : [...formData.dietaryRestrictions, diet];
                    setFormData({ ...formData, dietaryRestrictions: newDietary });
                  }}
                  className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition text-left cursor-pointer hover:bg-gray-50 select-none"
                  style={{
                    borderColor: isSelected ? COLORS.olive : COLORS.border,
                    backgroundColor: isSelected ? COLORS.activeBg : "white",
                    borderWidth: isSelected ? "2px" : "1px",
                  }}
                >
                  {/* Checkbox visual */}
                  <div
                    className="flex items-center justify-center rounded flex-shrink-0 transition"
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: isSelected ? COLORS.olive : "transparent",
                      border: isSelected ? "none" : `2px solid ${COLORS.border}`,
                    }}
                  >
                    {isSelected && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium" style={{ color: COLORS.ink }}>
                    {diet}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full" style={{ backgroundColor: COLORS.border }} />

        {/* MAX MEMBERS + ORDER DEADLINE */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Max Members */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <IconBadge>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </IconBadge>
              <label
                htmlFor="maxMembers"
                className="text-base font-bold"
                style={{ color: COLORS.ink, fontFamily: "Georgia, serif" }}
              >
                Max Members: {formData.maxMembers}
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="maxMembers"
                type="range"
                min={MIN_GROUP_MEMBERS}
                max={MAX_GROUP_MEMBERS}
                value={formData.maxMembers}
                onChange={(e) => setFormData({ ...formData, maxMembers: Number(e.target.value) })}
                className="olive-slider flex-1"
              />
              <div
                className="flex items-center justify-center rounded-lg font-bold text-sm"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.ink,
                  width: 48,
                  height: 36,
                }}
              >
                {formData.maxMembers}
              </div>
            </div>

            <div className="flex justify-between text-xs mt-2" style={{ color: COLORS.inkSoft }}>
              <span>{MIN_GROUP_MEMBERS}</span>
              <span>{MAX_GROUP_MEMBERS}</span>
            </div>
            {errors.maxMembers && (
              <p className="text-xs mt-1.5" style={{ color: "#B91C1C" }}>
                {errors.maxMembers}
              </p>
            )}
          </div>

          {/* Order Deadline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <IconBadge>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.olive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </IconBadge>
              <label
                htmlFor="orderDeadline"
                className="text-base font-bold"
                style={{ color: COLORS.ink, fontFamily: "Georgia, serif" }}
              >
                Order Deadline
              </label>
            </div>
            <input
              id="orderDeadline"
              type="datetime-local"
              value={formData.orderDeadline}
              onChange={(e) => setFormData({ ...formData, orderDeadline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition"
              style={{
                borderColor: COLORS.border,
                backgroundColor: "white",
                color: COLORS.ink,
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.olive)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
            />
            {errors.orderDeadline && (
              <p className="text-xs mt-1.5" style={{ color: "#B91C1C" }}>
                {errors.orderDeadline}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-base hover:opacity-90 transition disabled:opacity-50"
          style={{
            backgroundColor: COLORS.olive,
            fontFamily: "Georgia, serif",
          }}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </>
  );
}

