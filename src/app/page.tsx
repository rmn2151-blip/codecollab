import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#f0ece3" }}>

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-8 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" style={{ color: "#4a5c2f" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-base font-bold text-gray-900">Code<span style={{ color: "#6b8f3e" }}>Collab</span></span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 text-sm border-2 border-gray-800 rounded-full text-gray-800 hover:bg-gray-50 font-semibold bg-white">Sign in</Link>
          <Link href="/signup" className="px-5 py-2 text-sm text-white rounded-full font-semibold hover:opacity-90" style={{ background: "#5a7a2e" }}>Get started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      {/*
        Layout strategy:
        - Outer div is position:relative, full width, fixed height
        - Text col is absolute left
        - Bowl is absolute, centered in the page
        - Chat card is absolute, right side
        This gives us pixel-perfect control over positioning
      */}
      <div className="relative w-full overflow-hidden" style={{ height: "560px", background: "#f0ece3" }}>

        {/* Dotted grid — top right */}
        <div className="absolute top-3 right-3 pointer-events-none opacity-40" style={{ zIndex: 1 }}>
          {Array.from({ length: 7 }).map((_, r) => (
            <div key={r} className="flex gap-2.5 mb-2.5">
              {Array.from({ length: 8 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4a0a0" }} />
              ))}
            </div>
          ))}
        </div>

        {/* ── TEXT — pinned left ── */}
        <div className="absolute" style={{ left: "48px", top: "50%", transform: "translateY(-50%)", width: "340px", zIndex: 10 }}>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5 border" style={{ background: "#eef3e6", color: "#4a5c2f", borderColor: "#c6d9a0" }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            Barnard &amp; Columbia only
          </span>

          {/* Headline: "ORDER FOOD TOGETHER," on line 1, "WITHOUT THE CHAOS" on line 2 */}
          <h1 className="font-black uppercase mb-4" style={{ fontSize: "3rem", color: "#1a1a0e", lineHeight: 1.05 }}>
            ORDER FOOD TOGETHER,<br />
            <span style={{ color: "#6b8f3e" }}>WITHOUT THE CHAOS</span>
          </h1>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "#666" }}>
            Create a group, pick a restaurant, chat with your crew in real time, and place one order. No more 47-message group chats.
          </p>

          <div className="flex gap-3 mb-3">
            <Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold text-sm hover:opacity-90 shadow-md" style={{ background: "#5a7a2e" }}>
              Get started free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-gray-800 text-gray-800 rounded-xl text-sm font-bold hover:bg-gray-50 bg-white">
              Sign in
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" style={{ color: "#e88080" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            <span className="text-xs" style={{ color: "#999" }}>Free to use for students</span>
          </div>
        </div>

        {/* ── BOWL — centered-right, behind card ── */}
        {/* Positioned so its center is around x=680, vertically centered */}
        <div className="absolute" style={{ left: "390px", top: "50%", transform: "translateY(-50%)", zIndex: 5 }}>
          {/* Pink spark */}
          <svg className="absolute pointer-events-none" style={{ top: "30px", left: "30px", zIndex: 6 }} width="30" height="30" viewBox="0 0 32 32" fill="none">
            <line x1="16" y1="2" x2="16" y2="11" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="24" y1="8" x2="30" y2="2" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="8" y1="8" x2="2" y2="2" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
            alt="Food bowl"
            className="rounded-full object-cover shadow-2xl"
            style={{ width: "500px", height: "500px" }}
          />
        </div>

        {/* ── CHAT CARD — on top of bowl, anchored to right ── */}
        <div
          className="absolute bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          style={{ right: "40px", top: "50%", transform: "translateY(-50%)", width: "400px", zIndex: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button className="text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              </button>
              <div className="flex -space-x-1.5">
                {(["A", "B", "C", "D"] as const).map((l, i) => {
                  const colors = ["bg-blue-200 text-blue-700", "bg-purple-200 text-purple-700", "bg-pink-200 text-pink-700", "bg-amber-200 text-amber-700"];
                  return (
                    <div key={l} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${colors[i]}`}>
                      {l}
                    </div>
                  );
                })}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-none">lunch crew</p>
                <p className="text-[10px] text-gray-400 mt-0.5">4 members</p>
              </div>
            </div>
            <button className="text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="px-4 py-3 space-y-2">
            <div className="flex justify-end">
              <div>
                <p className="text-[10px] text-gray-400 text-right mb-1">12:30 PM</p>
                <div className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm text-white" style={{ background: "#5a7a2e" }}>
                  What are we feeling today?
                </div>
              </div>
            </div>

            {[
              { user: "C", color: "bg-pink-200 text-pink-700", msg: "How about Sushi? 🍣", time: "12:31 PM" },
              { user: "B", color: "bg-purple-200 text-purple-700", msg: "Works for me!", time: "12:32 PM" },
              { user: "D", color: "bg-amber-200 text-amber-700", msg: "I'll add drinks", time: "12:33 PM" },
            ].map((m) => (
              <div key={m.time} className="flex items-end gap-2">
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${m.color}`}>{m.user}</div>
                <div>
                  <div className="px-3 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-800 bg-gray-100">{m.msg}</div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{m.time}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <div>
                <div className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm text-white" style={{ background: "#5a7a2e" }}>
                  Perfect, I&apos;ll place the order 🙌
                </div>
                <p className="text-[10px] text-gray-400 text-right mt-0.5">12:34 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#5a7a2e" }}>
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-sm font-semibold" style={{ color: "#5a7a2e" }}>Order placed</span>
              <span className="text-[10px] text-gray-400 ml-auto">12:45 PM</span>
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
              <button className="text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <span className="text-sm text-gray-400 flex-1">Message lunch crew...</span>
              <button className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: "#5a7a2e" }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── FEATURES ── */}
      <div id="features" className="max-w-5xl mx-auto px-8 pt-10 pb-8">
        <h2 className="text-center font-black uppercase mb-8 tracking-wide" style={{ fontSize: "1.15rem", color: "#1a1a0e", letterSpacing: "0.04em" }}>
          EVERYTHING YOU NEED FOR <span style={{ color: "#e8834a" }}>STRESS-FREE</span> GROUP ORDERING
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              bgIcon: "#eef3e6", iconColor: "#5a7a2e", title: "GROUP\nORDERING",
              desc: "Create or join groups by restaurant. Set a member cap and order deadline.",
              icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
            },
            {
              bgIcon: "#fdf0e8", iconColor: "#e8834a", title: "REAL-TIME\nCHAT",
              desc: "Decide together what to order live. No delays, no back-and-forth texting.",
              icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>,
            },
            {
              bgIcon: "#fde8ee", iconColor: "#e8507a", title: "DIETARY\nFILTERS",
              desc: "Filter groups by dietary restrictions, flex dollars, and time remaining.",
              icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" /></svg>,
            },
            {
              bgIcon: "#fef3e2", iconColor: "#d4a020", title: "ONE EASY\nPAYMENT",
              desc: "Place one order and pay together. No more splitting headaches.",
              icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>,
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.bgIcon, color: card.iconColor }}>{card.icon}</div>
                <h3 className="text-sm font-black uppercase tracking-wide leading-tight pt-0.5" style={{ color: "#1a1a0e", whiteSpace: "pre-line" }}>{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-8"><div className="border-t border-gray-300" /></div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-8 pt-8 pb-8">
        <h2 className="text-center font-black uppercase mb-6 tracking-wide" style={{ fontSize: "1.15rem", color: "#1a1a0e", letterSpacing: "0.04em" }}>HOW IT WORKS</h2>
        <div className="flex items-center justify-between">
          {[
            {
              num: "1", numBg: "#5a7a2e", iconBg: "#eef3e6", iconColor: "#5a7a2e",
              title: "CREATE OR JOIN A GROUP", desc: "Use your .edu email to get started.",
              icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>,
            },
            {
              num: "2", numBg: "#e8834a", iconBg: "#fdf0e8", iconColor: "#e8834a",
              title: "CHAT & DECIDE", desc: "Vote, chat, and lock in on a place to eat.",
              icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>,
            },
            {
              num: "3", numBg: "#e8507a", iconBg: "#fde8ee", iconColor: "#e8507a",
              title: "ORDER & ENJOY", desc: "Place the order and the leader pays. You enjoy.",
              icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>,
            },
          ].map((step, idx) => (
            <div key={step.num} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: step.iconBg, color: step.iconColor }}>{step.icon}</div>
                  <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center" style={{ background: step.numBg }}>{step.num}</div>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wide" style={{ color: "#1a1a0e" }}>{step.title}</h4>
                  <p className="text-xs mt-0.5" style={{ color: "#777" }}>{step.desc}</p>
                </div>
              </div>
              {idx < 2 && (
                <div className="flex gap-1 px-4 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-3 h-0.5 rounded" style={{ background: "#c8c0b0" }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden border-t py-14 px-8" style={{ background: "#e8eedd", borderColor: "#d4e4b0" }}>
        <div className="absolute left-10 bottom-0 pointer-events-none">
          <svg width="130" height="120" viewBox="0 0 130 120" fill="none">
            <circle cx="40" cy="90" r="32" fill="#FDE68A" opacity="0.85"/>
            <g transform="translate(28, 16) rotate(-25, 38, 42)">
              <path d="M6 40 L76 6 L54 68 Z" fill="#5a7a2e" opacity="0.92"/>
              <path d="M6 40 L54 68 L38 48 Z" fill="#3d5a1e" opacity="0.85"/>
              <path d="M38 48 L54 68 L64 54 Z" fill="#8ab04e" opacity="0.7"/>
            </g>
            <path d="M16 92 Q46 60 88 30" stroke="#5a7a2e" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.3" fill="none"/>
          </svg>
        </div>
        <svg className="absolute pointer-events-none opacity-50" style={{ right: "220px", top: "20px" }} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <line x1="18" y1="3" x2="18" y2="12" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="27" y1="9" x2="33" y2="3" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="9" y1="9" x2="3" y2="3" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div className="absolute right-8 bottom-4 pointer-events-none opacity-25">
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="flex gap-3 mb-3">
              {Array.from({ length: 6 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: "#5a7a2e" }} />
              ))}
            </div>
          ))}
        </div>
        <div className="relative text-center" style={{ zIndex: 10 }}>
          <p className="font-black uppercase tracking-wide mb-1" style={{ fontSize: "1.5rem", color: "#1a1a0e" }}>
            READY TO ORDER SMARTER WITH <span style={{ color: "#6b8f3e" }}>YOUR CREW?</span>
          </p>
          <p className="text-sm mb-6 mt-1" style={{ color: "#777" }}>Only for Barnard &amp; Columbia students</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-xl font-bold text-sm hover:opacity-90 shadow-md" style={{ background: "#5a7a2e" }}>
            Create your account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <svg className="w-3.5 h-3.5" style={{ color: "#999" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-xs" style={{ color: "#999" }}>Only for Barnard and Columbia students</span>
          </div>
        </div>
      </div>

    </div>
  );
}

