"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/lib/validators/auth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/groups`,
        data: {
          display_name: formData.displayName,
        },
      },
    });

    if (error) {
      setErrors({ form: error.message });
      setLoading(false);
      return;
    }

    router.push("/groups");
  }

  // Using Google S2 favicon API with size=128 — serves real brand logos reliably.
  // brandBg = the actual brand color so the circle always looks polished even while loading.
  const restaurants = [
    { name: "Chipotle",       domain: "chipotle.com",     brandBg: "#A81612", groups: 3, save: "2.45", seeds: ["Mia", "Noah", "Zoe"] },
    { name: "Panda Express",  domain: "pandaexpress.com", brandBg: "#D62828", groups: 2, save: "1.80", seeds: ["Liam", "Ava", "Ethan"] },
    { name: "Wingstop",       domain: "wingstop.com",     brandBg: "#000000", groups: 4, save: "2.10", seeds: ["Sofia", "Lucas", "Isla", "Kai"] },
    { name: "Taco Bell",      domain: "tacobell.com",     brandBg: "#5D1E7F", groups: 1, save: "1.30", seeds: ["Maya", "Jace"] },
    { name: "Shake Shack",    domain: "shakeshack.com",   brandBg: "#2F5F3F", groups: 2, save: "1.75", seeds: ["Leo", "Ruby", "Theo"] },
  ];

  const avatarUrl = (seed: string) =>
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f5d7c4,e8c5e8,f0c4d4,c4e0d0,f5e0a0`;

  const logoUrl = (domain: string) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div className="min-h-screen" style={{ background: "#f0ece3" }}>

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-8 py-3 bg-white border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-6 h-6" style={{ color: "#4a5c2f" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-base font-bold text-gray-900">
            Code<span style={{ color: "#6b8f3e" }}>Collab</span>
          </span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 text-sm border-2 border-gray-800 rounded-full text-gray-800 hover:bg-gray-50 font-semibold bg-white">Sign in</Link>
          <Link href="/signup" className="px-5 py-2 text-sm text-white rounded-full font-semibold hover:opacity-90" style={{ background: "#5a7a2e" }}>Get started</Link>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ── */}
      <main className="relative overflow-hidden">

        <div className="absolute pointer-events-none opacity-40" style={{ top: "60px", right: "60px", zIndex: 1 }}>
          {Array.from({ length: 6 }).map((_, r) => (
            <div key={r} className="flex gap-2.5 mb-2.5">
              {Array.from({ length: 7 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: "#c6d9a0" }} />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute pointer-events-none" style={{ bottom: "-80px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "#d8e4c4", opacity: 0.4, zIndex: 0 }} />
        <div className="absolute pointer-events-none" style={{ bottom: "60px", right: "-80px", width: "220px", height: "220px", borderRadius: "50%", background: "#d8e4c4", opacity: 0.5, zIndex: 0 }} />

        <div className="max-w-7xl mx-auto px-8 py-6 grid lg:grid-cols-2 gap-16 items-start relative" style={{ zIndex: 10 }}>

          {/* ── LEFT PANEL ── */}
          <div className="relative flex flex-col">

            <h1 className="font-bold mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "3.25rem", color: "#1a1a0e", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Order together.<br />
              <span style={{ color: "#5a7a2e" }}>Save together.</span>
            </h1>

            <p className="text-base leading-relaxed mb-6 max-w-sm" style={{ color: "#666" }}>
              Join CodeCollab to order food together, chat in real time, and unlock group savings on delivery.
            </p>

            <div className="relative">

              <div className="absolute -top-2 -right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                <svg className="w-7 h-7" style={{ color: "#5a7a2e" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="5" cy="17" r="3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h6l2-10h3M12 7h4" />
                </svg>
              </div>

              <div className="absolute -bottom-3 -left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                <svg className="w-6 h-6" style={{ color: "#5a7a2e" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>

              <svg className="absolute pointer-events-none" style={{ top: "20px", right: "-20px", width: "80px", height: "200px" }} viewBox="0 0 80 200" fill="none">
                <path d="M 40 10 Q 70 60 30 110 Q 10 150 50 190" stroke="#5a7a2e" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.35" />
              </svg>

              {/* Restaurants card — tighter padding so everything fits */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 space-y-0">
                {restaurants.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 py-1.5">
                    {/* Real brand logo — colored circle with logo image on top */}
                    <div
                      className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden"
                      style={{ background: r.brandBg }}
                    >
                      <img
                        src={logoUrl(r.domain)}
                        alt={`${r.name} logo`}
                        className="w-8 h-8 object-contain"
                        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.2))" }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 leading-tight">{r.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        {r.groups} {r.groups === 1 ? "group" : "groups"} ordering
                      </div>
                    </div>

                    <div className="flex -space-x-2 flex-shrink-0">
                      {r.seeds.map((seed) => (
                        <img
                          key={seed}
                          src={avatarUrl(seed)}
                          alt=""
                          className="w-7 h-7 rounded-full border-2 border-white bg-gray-100"
                        />
                      ))}
                    </div>

                    <div className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: "#eef3e6", color: "#4a5c2f" }}>
                      Save ${r.save}
                    </div>

                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: "#eef3e6" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#c6d9a0" }}>
                <svg className="w-5 h-5" style={{ color: "#4a5c2f" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: "#4a5c2f" }}>More people, lower fees.</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">The more people who join your order, the less everyone pays for delivery.</p>
              </div>
              <div className="flex -space-x-2">
                {["Emma", "Oliver", "Lily", "Max"].map((seed) => (
                  <img
                    key={seed}
                    src={avatarUrl(seed)}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-100"
                  />
                ))}
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#5a7a2e" }}>-$$$</div>
            </div>
          </div>

          {/* ── RIGHT PANEL — Form card ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-md p-8 relative">

              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ background: "#eef3e6", color: "#4a5c2f", borderColor: "#c6d9a0" }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                  </svg>
                  Barnard &amp; Columbia only
                </span>
              </div>

              <div className="text-center mb-6">
                <h1 className="font-bold mb-1.5" style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#1a1a0e", letterSpacing: "-0.01em" }}>
                  Create <span style={{ color: "#5a7a2e" }}>your account</span>
                </h1>
                <p className="text-sm text-gray-500">Use your @barnard.edu or @columbia.edu email</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <p className="text-sm text-red-500 text-center bg-red-50 py-2 px-3 rounded-lg">{errors.form}</p>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="displayName">
                    Display name
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <input
                      id="displayName"
                      type="text"
                      placeholder="Your name"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                    />
                  </div>
                  {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="username@barnard.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirmPassword">
                    Confirm password
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 text-white rounded-xl font-bold text-sm hover:opacity-90 active:translate-y-[1px] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  style={{ background: "#5a7a2e" }}
                >
                  {loading ? "Creating account..." : (
                    <>
                      Create account
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 pt-1">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold hover:underline" style={{ color: "#5a7a2e" }}>Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

