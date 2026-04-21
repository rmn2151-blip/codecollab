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
      <div className="min-h-screen bg-[#f0f2ff] flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-[#f0f2ff] flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="text-lg font-medium text-blue-700 tracking-tight">
          CodeCollab
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">

        {/* LEFT — people circle with short burst sparks */}
        <div className="absolute left-24 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Short burst sparks — only near the circle */}
            <svg className="absolute -inset-6 w-36 h-36" viewBox="0 0 144 144">
              {/* top — short dash */}
              <line x1="72" y1="20" x2="72" y2="8" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-right */}
              <line x1="100" y1="30" x2="108" y2="22" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* right */}
              <line x1="118" y1="72" x2="130" y2="72" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-left */}
              <line x1="44" y1="30" x2="36" y2="22" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* left */}
              <line x1="26" y1="72" x2="14" y2="72" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            {/* Circle icon */}
            <div className="relative z-10 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
          </div>
          {/* Gold star — separate, below-left */}
          <div className="absolute -bottom-10 -left-6 text-yellow-400 text-2xl">✦</div>
          {/* Purple dot — separate, further below */}
          <div className="absolute -bottom-20 left-6 w-5 h-5 rounded-full bg-purple-200" />
        </div>

        {/* RIGHT — chat bubble + typing bubble each with their own short sparks */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 items-start">

          {/* Green message bubble with short sparks */}
          <div className="relative">
            <svg className="absolute -inset-5 w-52 h-28 pointer-events-none" viewBox="0 0 208 112">
              {/* top */}
              <line x1="104" y1="12" x2="104" y2="2" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-right */}
              <line x1="168" y1="20" x2="176" y2="12" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
              {/* right */}
              <line x1="196" y1="56" x2="206" y2="56" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-left */}
              <line x1="40" y1="20" x2="32" y2="12" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div className="relative z-10 bg-green-100 text-green-800 text-sm px-4 py-3 rounded-2xl rounded-br-sm shadow-sm max-w-[160px]">
              Let&apos;s decide what to eat! 🍕
            </div>
            <div className="absolute -bottom-1.5 right-3 w-3 h-3 bg-green-100 rotate-45" />
          </div>

          {/* Blue typing bubble with short sparks */}
          <div className="relative ml-10">
            <svg className="absolute -inset-5 w-32 h-24 pointer-events-none" viewBox="0 0 128 96">
              {/* top */}
              <line x1="64" y1="10" x2="64" y2="2" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-right */}
              <line x1="100" y1="20" x2="108" y2="12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
              {/* top-left */}
              <line x1="28" y1="20" x2="20" y2="12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div className="relative z-10 w-16 h-10 bg-blue-500 rounded-2xl rounded-bl-sm flex items-center justify-center gap-1 shadow-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Gray star — separate below */}
          <div className="text-gray-300 text-2xl ml-4">✦</div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 relative z-10">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
              Barnard & Columbia only
            </span>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-medium text-gray-900 mb-1">
              Create <span className="text-blue-600">your account</span>
            </h1>
            <p className="text-sm text-gray-500">Use your @barnard.edu or @columbia.edu email</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <p className="text-sm text-red-500 text-center bg-red-50 py-2 px-3 rounded-lg">{errors.form}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="displayName">Display name</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input id="displayName" type="text" placeholder="Your name" value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">Email</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <input id="email" type="email" placeholder="username@barnard.edu" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input id="password" type="password" placeholder="At least 6 characters" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirmPassword">Confirm password</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-700 text-white rounded-lg font-medium text-sm hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

