"use client";

import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#eef0fb] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Check your email</h2>
          <p className="text-sm text-gray-500">
            We sent a confirmation link to <span className="font-medium text-gray-700">{formData.email}</span>. Click it to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef0fb] flex flex-col">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-lg font-semibold text-gray-900">
            Code<span className="text-blue-600">Collab</span>
          </span>
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex-1 flex min-h-0">

        {/* ── LEFT PANEL ── */}
        <div className="w-[600px] flex-shrink-0 flex flex-col justify-start pt-10 px-12 pb-8 relative overflow-hidden">

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-white text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100 shadow-sm mb-6 self-start">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
            Barnard &amp; Columbia only
          </span>

          {/* Heading */}
          <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
            Create your<br />
            <span className="text-blue-600">account</span>
          </h1>

          <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-xs">
            Join CodeCollab to order food together, chat in real time, and place one order with your crew.
          </p>

          {/* Spark lines above chat mockup */}
          <div className="relative mb-2">
            <svg className="absolute right-[80px] top-[-30px] w-10 h-10 pointer-events-none" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="4" x2="20" y2="13" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="30" y1="10" x2="37" y2="3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="10" x2="3" y2="3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            {/* Dashed swirl arrow */}
            <svg className="absolute right-[50px] top-[-10px] w-28 h-16 pointer-events-none" viewBox="0 0 112 64" fill="none">
              <path d="M 8 56 Q 30 10 70 30 Q 88 38 92 18" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 4" fill="none" opacity="0.55"/>
              <path d="M 86 12 L 94 16 L 98 8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55"/>
            </svg>

            {/* ── PHONE / CARD MOCKUP ── */}
            <div className="relative w-[420px]">
              {/* White card with rounded corners mimicking a phone screen */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-6 pt-5 pb-7 overflow-hidden">

                {/* Tiny top bar like a phone notch row */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-1 rounded-full bg-gray-200" />
                </div>

                {/* Messages */}
                <div className="flex flex-col gap-4">
                  {/* Message A */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">A</div>
                    <div className="bg-blue-500 text-white text-sm px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm leading-snug">
                      I&apos;ll pay this time, just Zelle me
                    </div>
                  </div>

                  {/* Message B */}
                  <div className="flex items-center gap-3 ml-3">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0">B</div>
                    <div className="bg-gray-50 text-gray-800 text-sm px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
                      Sounds good, Zelling you now! 👍
                    </div>
                  </div>

                  {/* Message C */}
                  <div className="flex items-start gap-3 ml-1">
                    <div className="w-9 h-9 rounded-full bg-pink-200 flex items-center justify-center text-xs font-bold text-pink-600 flex-shrink-0">C</div>
                    <div className="bg-purple-500 text-white text-sm px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                      Same, just sent it! 🙌
                    </div>
                  </div>
                </div>
              </div>

              {/* People circle icon with sparks — floating outside card, bottom-right */}
              <div className="absolute -bottom-3 -right-10">
                <div className="relative">
                  <svg className="absolute -inset-3 w-20 h-20 pointer-events-none" viewBox="0 0 80 80">
                    <line x1="40" y1="4" x2="40" y2="11" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="64" y1="16" x2="70" y2="10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="16" x2="10" y2="10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="70" y1="40" x2="77" y2="40" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 relative z-10">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                  {/* Gold star */}
                  <div className="absolute -top-2 -right-1 text-yellow-400 text-base leading-none">✦</div>
                  {/* Blue diamond */}
                  <div className="absolute -bottom-5 right-[-14px] text-blue-400 text-base leading-none">✦</div>
                </div>
              </div>
            </div>
          </div>

          {/* Large decorative circle bottom-left */}
          <div className="absolute bottom-[-80px] left-[-60px] w-64 h-64 rounded-full bg-purple-200 opacity-40 pointer-events-none" />
        </div>

        {/* ── RIGHT PANEL — Form card ── */}
        <div className="flex-1 flex items-start justify-center px-8 pt-10 pb-8 relative overflow-hidden">

          {/* Dot grid — top right */}
          <div className="absolute top-[50px] right-[50px] pointer-events-none">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className="absolute w-1 h-1 rounded-full bg-indigo-300 opacity-50"
                  style={{ top: row * 14, left: col * 14 }}
                />
              ))
            )}
          </div>

          {/* Large decorative circle — bottom right */}
          <div className="absolute bottom-[-60px] right-[-40px] w-64 h-64 rounded-full bg-purple-200 opacity-50 pointer-events-none" />

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-lg p-8 relative z-10">

            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                Barnard &amp; Columbia only
              </span>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1.5">
                Create <span className="text-blue-600">your account</span>
              </h1>
              <p className="text-sm text-gray-500">Use your @barnard.edu or @columbia.edu email</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <p className="text-sm text-red-500 text-center bg-red-50 py-2 px-3 rounded-lg">{errors.form}</p>
              )}

              {/* Display name */}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
                {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
              </div>

              {/* Email */}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
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
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
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

              {/* Confirm password */}
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
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-700 text-white rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
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
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

