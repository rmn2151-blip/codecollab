import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

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

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#campuses" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">For campuses</a>
          <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
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
        <div className="absolute top-[-60px] right-[-40px] w-72 h-72 rounded-full bg-[#c5caf0] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-10 py-16 flex items-center gap-12">

          {/* LEFT — text */}
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-white text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-blue-100 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              Barnard &amp; Columbia only
            </span>
            <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5">
              Order food together,{" "}
              <span className="text-blue-600 relative">
                without the chaos
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" preserveAspectRatio="none">
                  <path d="M0 5 Q75 1 150 4 Q225 7 300 3" stroke="#818cf8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-2 max-w-md">
              Create a group, pick a restaurant, chat with your crew in real time,
              and place one order. No more 47-message group chats.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                Get started free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/login" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors bg-white">
                Sign in
              </Link>
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-xs text-gray-400">Free to use for students</span>
            </div>
          </div>

          {/* RIGHT — Chat UI mockup */}
          <div className="relative flex-shrink-0 w-[480px]">
            {/* Decorative dashed arc */}
            <div className="absolute right-[-30px] top-[10%] w-[160px] h-[300px] rounded-r-full border-2 border-dashed border-indigo-300 opacity-50 pointer-events-none" />

            {/* Chat card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["A","B","C","D"].map((l, i) => {
                      const colors = ["bg-blue-200 text-blue-700","bg-purple-200 text-purple-700","bg-pink-200 text-pink-700","bg-amber-200 text-amber-700"];
                      return (
                        <div key={l} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${colors[i]}`}>{l}</div>
                      );
                    })}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-none">lunch crew</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">4 members</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </button>
              </div>

              {/* Chat messages */}
              <div className="px-4 py-3 space-y-3">
                {[
                  { user: "A", color: "bg-blue-200 text-blue-700", msg: "What are we feeling today?", time: "12:30 PM" },
                  { user: "C", color: "bg-pink-200 text-pink-700", msg: "How about Sushi?", time: "12:31 PM" },
                  { user: "B", color: "bg-purple-200 text-purple-700", msg: "Works for me! 🍣", time: "12:32 PM" },
                  { user: "D", color: "bg-amber-200 text-amber-700", msg: "I'll add drinks", time: "12:33 PM" },
                ].map((m) => (
                  <div key={m.time} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${m.color}`}>{m.user}</div>
                    <span className="text-sm text-gray-800 flex-1">{m.msg}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Order placed */}
              <div className="mx-4 mb-4 mt-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Order placed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">12:45 PM</span>
                  {/* Spark */}
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="2" x2="10" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="15" y1="5" x2="18" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="5" y1="5" x2="2" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pink squiggle accent */}
            <svg className="absolute bottom-[-20px] left-[20px] w-16 h-8 opacity-70 pointer-events-none" viewBox="0 0 64 24" fill="none">
              <path d="M4 18 Q16 6 28 14 Q40 22 52 10 Q58 4 62 8" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div id="features" className="max-w-5xl mx-auto px-10 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Everything you need for{" "}
          <span className="text-blue-600 relative">
            stress-free
            <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
              <path d="M0 3 Q25 1 50 3 Q75 5 100 2" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </span>{" "}
          group ordering
        </h2>
        <div className="grid grid-cols-4 gap-4 mt-10">
          {[
            {
              color: "bg-blue-50",
              icon: (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              ),
              accent: "bg-blue-600",
              title: "Group ordering",
              desc: "Create or join groups by restaurant. Set a member cap and order deadline.",
            },
            {
              color: "bg-indigo-50",
              icon: (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              ),
              accent: "bg-indigo-600",
              title: "Real-time chat",
              desc: "Decide together what to order live. No delays, no back-and-forth texting.",
            },
            {
              color: "bg-pink-50",
              icon: (
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              ),
              accent: "bg-pink-500",
              title: "Dietary filters",
              desc: "Filter groups by dietary restrictions, flex dollars, and time remaining.",
            },
            {
              color: "bg-emerald-50",
              icon: (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              ),
              accent: "bg-emerald-500",
              title: "One easy payment",
              desc: "Place one order and pay together. No more splitting headaches.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{card.title}</h3>
              <div className={`w-6 h-0.5 ${card.accent} rounded mb-3`} />
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-10">
        <div className="border-t border-gray-200" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" className="max-w-4xl mx-auto text-center px-10 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-12">
          How it works
          <svg className="mx-auto mt-1" width="60" height="4" viewBox="0 0 60 4" fill="none">
            <path d="M0 2 Q15 0 30 2 Q45 4 60 2" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </h2>
        <div className="grid grid-cols-3 gap-10 relative">
          {/* Connecting dashed line */}
          <div className="absolute top-[30px] left-[22%] right-[22%] flex items-center pointer-events-none z-0">
            <div className="flex-1 border-t-2 border-dashed border-gray-300" />
          </div>

          {[
            {
              num: "1",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              ),
              title: "Create or join a group",
              desc: "Use your .edu email to get started.",
            },
            {
              num: "2",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              ),
              title: "Chat & decide",
              desc: "Vote, chat, and lock in on a place to eat.",
            },
            {
              num: "3",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ),
              title: "Order & enjoy",
              desc: "Place the order and the leader pays. You enjoy.",
            },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              {/* Number badge */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {step.num}
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAR ── */}
      <div className="relative overflow-hidden bg-[#eef0fb] border-t border-blue-100 py-16 px-8">
        {/* Paper plane illustration */}
        <div className="absolute left-8 bottom-0 pointer-events-none">
          <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sun/circle */}
            <circle cx="40" cy="85" r="32" fill="#FDE68A" opacity="0.9"/>
            {/* Paper plane */}
            <g transform="translate(30, 20) rotate(-20, 40, 40)">
              <path d="M10 40 L80 10 L55 70 Z" fill="#6366f1" opacity="0.9"/>
              <path d="M10 40 L55 70 L40 50 Z" fill="#4f46e5" opacity="0.8"/>
              <path d="M40 50 L55 70 L65 55 Z" fill="#818cf8" opacity="0.7"/>
            </g>
            {/* Dashed trail */}
            <path d="M20 90 Q50 60 90 30" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" fill="none"/>
          </svg>
        </div>

        {/* Spark accents right */}
        <svg className="absolute right-[180px] top-[28px] w-12 h-12 opacity-50 pointer-events-none" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="6" x2="24" y2="16" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="14" x2="44" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="14" x2="4" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute right-[60px] bottom-[40px] w-8 h-8 opacity-40 pointer-events-none" viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="4" x2="16" y2="11" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="8" x2="29" y2="3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="8" x2="3" y2="3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Dotted grid right side */}
        <div className="absolute right-8 bottom-4 pointer-events-none opacity-30">
          {Array.from({length: 5}).map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {Array.from({length: 6}).map((_, col) => (
                <div key={col} className="w-1 h-1 rounded-full bg-blue-400" />
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">
            Ready to order smarter with{" "}
            <span className="text-blue-600">your crew?</span>
          </p>
          <p className="text-sm text-gray-500 mb-6 mt-1">Only for Barnard &amp; Columbia students</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
          >
            Create your account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-xs text-gray-400">Only for Barnard and Columbia students</span>
          </div>
        </div>
      </div>

    </div>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

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

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#campuses" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">For campuses</a>
          <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
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
        <div className="absolute top-[-60px] right-[-40px] w-72 h-72 rounded-full bg-[#c5caf0] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-10 py-16 flex items-center gap-12">

          {/* LEFT — text */}
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-white text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-blue-100 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              Barnard &amp; Columbia only
            </span>
            <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight mb-5">
              Order food together,{" "}
              <span className="text-blue-600 relative">
                without the chaos
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" preserveAspectRatio="none">
                  <path d="M0 5 Q75 1 150 4 Q225 7 300 3" stroke="#818cf8" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-2 max-w-md">
              Create a group, pick a restaurant, chat with your crew in real time,
              and place one order. No more 47-message group chats.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                Get started free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/login" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors bg-white">
                Sign in
              </Link>
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-xs text-gray-400">Free to use for students</span>
            </div>
          </div>

          {/* RIGHT — Chat UI mockup */}
          <div className="relative flex-shrink-0 w-[480px]">
            {/* Decorative dashed arc */}
            <div className="absolute right-[-30px] top-[10%] w-[160px] h-[300px] rounded-r-full border-2 border-dashed border-indigo-300 opacity-50 pointer-events-none" />

            {/* Chat card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["A","B","C","D"].map((l, i) => {
                      const colors = ["bg-blue-200 text-blue-700","bg-purple-200 text-purple-700","bg-pink-200 text-pink-700","bg-amber-200 text-amber-700"];
                      return (
                        <div key={l} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${colors[i]}`}>{l}</div>
                      );
                    })}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-none">lunch crew</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">4 members</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </button>
              </div>

              {/* Chat messages */}
              <div className="px-4 py-3 space-y-3">
                {[
                  { user: "A", color: "bg-blue-200 text-blue-700", msg: "What are we feeling today?", time: "12:30 PM" },
                  { user: "C", color: "bg-pink-200 text-pink-700", msg: "How about Sushi?", time: "12:31 PM" },
                  { user: "B", color: "bg-purple-200 text-purple-700", msg: "Works for me! 🍣", time: "12:32 PM" },
                  { user: "D", color: "bg-amber-200 text-amber-700", msg: "I'll add drinks", time: "12:33 PM" },
                ].map((m) => (
                  <div key={m.time} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${m.color}`}>{m.user}</div>
                    <span className="text-sm text-gray-800 flex-1">{m.msg}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Order placed */}
              <div className="mx-4 mb-4 mt-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">Order placed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">12:45 PM</span>
                  {/* Spark */}
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="2" x2="10" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="15" y1="5" x2="18" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="5" y1="5" x2="2" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pink squiggle accent */}
            <svg className="absolute bottom-[-20px] left-[20px] w-16 h-8 opacity-70 pointer-events-none" viewBox="0 0 64 24" fill="none">
              <path d="M4 18 Q16 6 28 14 Q40 22 52 10 Q58 4 62 8" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div id="features" className="max-w-5xl mx-auto px-10 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Everything you need for{" "}
          <span className="text-blue-600 relative">
            stress-free
            <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
              <path d="M0 3 Q25 1 50 3 Q75 5 100 2" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </span>{" "}
          group ordering
        </h2>
        <div className="grid grid-cols-4 gap-4 mt-10">
          {[
            {
              color: "bg-blue-50",
              icon: (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              ),
              accent: "bg-blue-600",
              title: "Group ordering",
              desc: "Create or join groups by restaurant. Set a member cap and order deadline.",
            },
            {
              color: "bg-indigo-50",
              icon: (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              ),
              accent: "bg-indigo-600",
              title: "Real-time chat",
              desc: "Decide together what to order live. No delays, no back-and-forth texting.",
            },
            {
              color: "bg-pink-50",
              icon: (
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              ),
              accent: "bg-pink-500",
              title: "Dietary filters",
              desc: "Filter groups by dietary restrictions, flex dollars, and time remaining.",
            },
            {
              color: "bg-emerald-50",
              icon: (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              ),
              accent: "bg-emerald-500",
              title: "One easy payment",
              desc: "Place one order and pay together. No more splitting headaches.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{card.title}</h3>
              <div className={`w-6 h-0.5 ${card.accent} rounded mb-3`} />
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-10">
        <div className="border-t border-gray-200" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" className="max-w-4xl mx-auto text-center px-10 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-12">
          How it works
          <svg className="mx-auto mt-1" width="60" height="4" viewBox="0 0 60 4" fill="none">
            <path d="M0 2 Q15 0 30 2 Q45 4 60 2" stroke="#818cf8" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </h2>
        <div className="grid grid-cols-3 gap-10 relative">
          {/* Connecting dashed line */}
          <div className="absolute top-[30px] left-[22%] right-[22%] flex items-center pointer-events-none z-0">
            <div className="flex-1 border-t-2 border-dashed border-gray-300" />
          </div>

          {[
            {
              num: "1",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              ),
              title: "Create or join a group",
              desc: "Use your .edu email to get started.",
            },
            {
              num: "2",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              ),
              title: "Chat & decide",
              desc: "Vote, chat, and lock in on a place to eat.",
            },
            {
              num: "3",
              icon: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ),
              title: "Order & enjoy",
              desc: "Place the order and the leader pays. You enjoy.",
            },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              {/* Number badge */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {step.num}
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAR ── */}
      <div className="relative overflow-hidden bg-[#eef0fb] border-t border-blue-100 py-16 px-8">
        {/* Paper plane illustration */}
        <div className="absolute left-8 bottom-0 pointer-events-none">
          <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sun/circle */}
            <circle cx="40" cy="85" r="32" fill="#FDE68A" opacity="0.9"/>
            {/* Paper plane */}
            <g transform="translate(30, 20) rotate(-20, 40, 40)">
              <path d="M10 40 L80 10 L55 70 Z" fill="#6366f1" opacity="0.9"/>
              <path d="M10 40 L55 70 L40 50 Z" fill="#4f46e5" opacity="0.8"/>
              <path d="M40 50 L55 70 L65 55 Z" fill="#818cf8" opacity="0.7"/>
            </g>
            {/* Dashed trail */}
            <path d="M20 90 Q50 60 90 30" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" fill="none"/>
          </svg>
        </div>

        {/* Spark accents right */}
        <svg className="absolute right-[180px] top-[28px] w-12 h-12 opacity-50 pointer-events-none" viewBox="0 0 48 48" fill="none">
          <line x1="24" y1="6" x2="24" y2="16" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="14" x2="44" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="14" x2="4" y2="6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute right-[60px] bottom-[40px] w-8 h-8 opacity-40 pointer-events-none" viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="4" x2="16" y2="11" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="8" x2="29" y2="3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="8" x2="3" y2="3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Dotted grid right side */}
        <div className="absolute right-8 bottom-4 pointer-events-none opacity-30">
          {Array.from({length: 5}).map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {Array.from({length: 6}).map((_, col) => (
                <div key={col} className="w-1 h-1 rounded-full bg-blue-400" />
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">
            Ready to order smarter with{" "}
            <span className="text-blue-600">your crew?</span>
          </p>
          <p className="text-sm text-gray-500 mb-6 mt-1">Only for Barnard &amp; Columbia students</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
          >
            Create your account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-xs text-gray-400">Only for Barnard and Columbia students</span>
          </div>
        </div>
      </div>

    </div>
  );
}

