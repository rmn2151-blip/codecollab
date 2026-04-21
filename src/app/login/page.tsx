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
    <div className="min-h-screen flex">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-[48%] relative overflow-hidden flex-col bg-[#f4f6ff]">

        {/* LIGHT TOP SHAPE */}
        <div
          className="absolute top-0 left-0 w-full h-[55%] bg-[#eef2ff]"
          style={{ clipPath: "ellipse(120% 60% at 50% 0%)" }}
        />

        {/* FOOD IMAGE (FIXED POSITIONED) */}
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80"
          alt="Food bowl"
          className="absolute bottom-[-80px] left-[-60px] w-[520px] object-cover z-0"
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full p-10">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197" />
            </svg>
            <span className="text-lg font-medium text-blue-700">
              Code<span className="text-blue-500">Collab</span>
            </span>
          </div>

          {/* TEXT */}
          <div className="mt-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-3">
              Welcome <span className="text-blue-600">back</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-sm leading-relaxed">
              Good food, great company,<br />
              even better together.
            </p>
          </div>

          {/* FOOD UI ACCENTS */}
          <div className="absolute bottom-32 left-24 bg-white px-4 py-2 rounded-full shadow-md text-sm text-gray-700">
            🍜 Group orders made easy
          </div>

          <div className="absolute bottom-20 left-44 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
            🥑
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-[#f8f9ff] flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="text-base font-medium text-blue-700">CodeCollab</span>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {errors.form && (
                <p className="text-sm text-red-500 text-center bg-red-50 py-2 px-3 rounded-lg">
                  {errors.form}
                </p>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@barnard.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />

                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />

                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800"
              >
                {loading ? "Signing in..." : "Sign in →"}
              </button>

              {/* FOOTER */}
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
