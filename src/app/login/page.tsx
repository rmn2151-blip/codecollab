"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormData } from "@/lib/validators/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
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
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrors({ form: error.message });
      setLoading(false);
      return;
    }

    router.push("/groups");
    router.refresh();
  }

  return (
    <div className="min-h-screen" style={{ background: "#f0ece3" }}>

      {/* ── NAV ── */}
      <nav className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-6 h-6" style={{ color: "#4a5c2f" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-base font-bold text-gray-900" style={{ fontFamily: "var(--font-fredoka)" }}>
            Code<span style={{ color: "#6b8f3e" }}>Collab</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1.5 font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to home
        </Link>
      </nav>

      {/* ── MAIN ── */}
      <main className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 57px)" }}>

        {/* Dotted grid — top right */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-40" style={{ zIndex: 1 }}>
          {Array.from({ length: 7 }).map((_, r) => (
            <div key={r} className="flex gap-2.5 mb-2.5">
              {Array.from({ length: 8 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4a0a0" }} />
              ))}
            </div>
          ))}
        </div>

        {/* Dotted grid — bottom left */}
        <div className="absolute bottom-8 left-4 pointer-events-none opacity-20" style={{ zIndex: 1 }}>
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="flex gap-2.5 mb-2.5">
              {Array.from({ length: 6 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: "#5a7a2e" }} />
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-2 gap-12 items-center" style={{ minHeight: "calc(100vh - 57px)" }}>

          {/* ── LEFT ── */}
          <div className="relative flex flex-col justify-center">

            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-8 border w-fit" style={{ background: "#eef3e6", color: "#4a5c2f", borderColor: "#c6d9a0" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Barnard &amp; Columbia only
            </span>

            {/* Heading */}
            <h1
              className="font-black uppercase mb-6"
              style={{ fontFamily: "var(--font-fredoka)", fontSize: "4rem", color: "#1a1a0e", lineHeight: 1.0 }}
            >
              WELCOME<br />
              <span style={{ color: "#6b8f3e" }}>BACK.</span>
            </h1>

            <p className="text-sm leading-relaxed mb-10" style={{ color: "#666", maxWidth: "320px" }}>
              Log in to continue collaborating with your crew, order together, and keep the good food flowing.
            </p>

            {/* Food collage */}
            <div className="relative" style={{ width: "380px", height: "300px" }}>

              {/* pink spark */}
              <svg className="absolute pointer-events-none" style={{ top: "10px", left: "150px", zIndex: 8 }} width="26" height="26" viewBox="0 0 32 32" fill="none">
                <line x1="16" y1="2" x2="16" y2="11" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="24" y1="8" x2="30" y2="2" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="8" x2="2" y2="2" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              {/* main bowl */}
              <div className="absolute rounded-full overflow-hidden shadow-2xl border-2 border-white" style={{ width: "240px", height: "240px", left: "80px", top: "30px", zIndex: 6 }}>
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
                  alt="Food bowl"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "75% center", transform: "scale(1.4)" }}
                />
              </div>

              {/* pasta top left */}
              <div className="absolute rounded-full overflow-hidden shadow-xl border-2 border-white" style={{ width: "110px", height: "110px", left: "0px", top: "20px", zIndex: 4 }}>
                <img
                  src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80"
                  alt="Pasta"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 40%", transform: "scale(1.4)" }}
                />
              </div>

              {/* sushi bottom right */}
              <img
                src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
                alt="Sushi"
                className="absolute rounded-full object-cover shadow-xl border-2 border-white"
                style={{ width: "100px", height: "100px", left: "290px", top: "190px", objectPosition: "center", zIndex: 7 }}
              />
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="w-full flex justify-center lg:justify-end" style={{ zIndex: 10 }}>
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                  <p className="text-sm text-red-600 text-center bg-red-50 border border-red-100 py-2 px-3 rounded-lg">
                    {errors.form}
                  </p>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@barnard.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                      style={{ focusRingColor: "#5a7a2e" } as React.CSSProperties}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#5a7a2e] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#5a7a2e]" />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="text-sm font-semibold hover:underline" style={{ color: "#5a7a2e" }}>
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-white rounded-xl font-bold text-sm hover:opacity-90 active:translate-y-[1px] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  style={{ background: "#5a7a2e" }}
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <span>Sign in</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-600 pt-2">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-semibold hover:underline" style={{ color: "#5a7a2e" }}>
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

