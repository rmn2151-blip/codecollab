import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f5fb]">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-lg font-semibold text-gray-900">
            Code<span className="text-blue-600">Collab</span>
          </span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors bg-white">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-[#f4f5fb]">

        {/* Decorative circle top-right */}
        <div className="absolute top-[-60px] right-[-40px] w-64 h-64 rounded-full bg-[#c5caf0] opacity-50 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-10 py-16 flex items-center gap-12">

          {/* LEFT — text */}
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-white text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-blue-100 shadow-sm">
              Barnard &amp; Columbia only
            </span>
            <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5">
              Order food together,{" "}
              <span className="text-blue-600">without the chaos</span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
              Create a group, pick a restaurant, chat with your crew in real time,
              and place one order. No more 47-message group chats.
            </p>
            <div className="flex gap-3">
              <Link href="/signup" className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                Get started free
              </Link>
              <Link href="/login" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors bg-white">
                Sign in
              </Link>
            </div>
          </div>

          {/* RIGHT — food bowl visual */}
          <div className="relative flex-shrink-0 w-[520px] h-[400px]">

            {/* Large faded circle behind the bowl */}
            <div className="absolute right-[-20px] bottom-[-40px] w-[420px] h-[420px] rounded-full bg-[#dde1f5] opacity-80 pointer-events-none" />

            {/* Main burrito bowl */}
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
              alt="Food bowl"
              className="absolute right-[10px] top-[20px] w-[390px] h-[390px] object-cover drop-shadow-2xl pointer-events-none z-10"
            />

            {/* Lime slices — top left of bowl */}
            <img
              src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=200&auto=format&fit=crop&q=80"
              alt=""
              className="absolute left-[10px] top-[10px] w-[110px] h-[110px] object-cover drop-shadow-md pointer-events-none z-20"
            />

            {/* Lunch crew badge */}
            <div className="absolute left-[60px] top-[50%] -translate-y-1/2 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2.5 z-30 border border-gray-100">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">A</div>
                <div className="w-7 h-7 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-purple-700">B</div>
                <div className="w-7 h-7 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-pink-700">C</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-none">lunch crew</p>
                <p className="text-[10px] text-gray-400 mt-0.5">4 members</p>
              </div>
            </div>

            {/* Dashed connector line + dot */}
            <svg className="absolute right-[0px] top-[45%] w-48 h-12 pointer-events-none z-20" viewBox="0 0 192 48" fill="none">
              <path d="M 10 24 Q 80 10 170 28" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6"/>
              <circle cx="172" cy="28" r="5" fill="#3b82f6" opacity="0.9"/>
            </svg>

            {/* Spark lines near dot */}
            <svg className="absolute right-[4px] top-[36%] w-10 h-10 pointer-events-none z-20" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="4" x2="20" y2="12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="30" y1="10" x2="36" y2="4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="10" x2="4" y2="4" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FEATURE CARDS ── */}
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4 px-10 pb-12">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Group ordering</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Create or join groups by restaurant. Set a member cap and order deadline.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Real-time chat</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Decide together what to order live. No delays, no back-and-forth texting.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Dietary filters</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Filter groups by dietary restrictions, flex dollars, and time remaining.
          </p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-10">
        <div className="border-t border-gray-200" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="max-w-4xl mx-auto text-center px-10 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">How it works</h2>
        <div className="grid grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-[15px] left-[12%] right-[12%] h-[2px] bg-gray-200 z-0" />
          {[
            { num: "1", title: "Sign up", desc: "Use your .edu email to join" },
            { num: "2", title: "Find a group", desc: "Browse open groups or create one" },
            { num: "3", title: "Chat & order", desc: "Decide together, then place the order" },
            { num: "4", title: "Done!", desc: "Leader dissolves the group when finished" },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-sm font-semibold flex items-center justify-center mb-3 shadow-md shadow-blue-200">
                {step.num}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAR ── */}
      <div className="relative overflow-hidden bg-[#eef0fb] border-t border-blue-100 py-14 text-center px-8">
        {/* Decorative food images in CTA */}
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80"
          alt=""
          className="absolute left-[-20px] bottom-[-30px] w-[220px] h-[220px] object-cover opacity-90 pointer-events-none"
        />
        <img
          src="https://images.unsplash.com/photo-1548940740-204726a19be3?w=300&auto=format&fit=crop&q=80"
          alt=""
          className="absolute right-[-10px] bottom-[-20px] w-[180px] h-[180px] object-cover opacity-90 pointer-events-none"
        />
        {/* Spark accents */}
        <svg className="absolute left-[200px] bottom-[60px] w-12 h-12 opacity-60 pointer-events-none" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="6" x2="24" y2="16" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="14" x2="44" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="14" x2="4" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute right-[200px] top-[30px] w-12 h-12 opacity-60 pointer-events-none" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="6" x2="24" y2="16" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="14" x2="44" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="14" x2="4" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div className="relative z-10">
          <p className="text-lg font-semibold text-gray-900 mb-5">
            Ready to order smarter with your campus crew?
          </p>
          <Link
            href="/signup"
            className="inline-block px-7 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
          >
            Create your account
          </Link>
        </div>
      </div>

    </div>
  );
}

