import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-7 h-7" style={{ color: "#4a5c2f" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span className="text-lg font-bold text-gray-900">
            Code<span style={{ color: "#6b8f3e" }}>Collab</span>
          </span>
        </div>

        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 text-sm border-2 border-gray-800 rounded-full text-gray-800 hover:bg-gray-50 transition-colors bg-white font-semibold">
            Sign in
          </Link>
          <Link href="/signup" className="px-5 py-2 text-sm text-white rounded-full font-semibold hover:opacity-90 transition-colors" style={{ background: "#5a7a2e" }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ background: "#f5f0e8" }}>
        {/* Dotted grid top-right */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-40">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {Array.from({ length: 7 }).map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: "#e8a0a0" }} />
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-12 gap-4 items-center">

          {/* LEFT — text (3 cols) */}
          <div className="col-span-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6 border" style={{ background: "#eef3e6", color: "#4a5c2f", borderColor: "#c6d9a0" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Barnard &amp; Columbia only
            </span>

            <h1 className="font-black leading-none tracking-tight mb-5 uppercase" style={{ fontSize: "3.2rem", color: "#1a1a0e", fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}>
              ORDER FOOD TOGETHER,{" "}
              <span style={{ color: "#6b8f3e" }}>WITHOUT THE CHAOS</span>
            </h1>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#555" }}>
              Create a group, pick a restaurant, chat with your crew in real time, and place one order. No more 47-message group chats.
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-colors shadow-md" style={{ background: "#5a7a2e" }}>
                Get started free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors bg-white">
                Sign in
              </Link>
            </div>

            <div className="flex items-center gap-1.5 mt-4">
              <svg className="w-4 h-4" style={{ color: "#e88080" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-xs" style={{ color: "#888" }}>Free to use for students</span>
            </div>
          </div>

          {/* CENTER — food bowl (5 cols) */}
          <div className="col-span-5 flex items-center justify-center relative">
            {/* Large soft circle behind bowl */}
            <div className="absolute w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: "#f0c8b0", opacity: 0.5 }} />
            {/* Spark accents */}
            <svg className="absolute top-4 left-16 w-10 h-10 pointer-events-none" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="4" x2="20" y2="14" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="30" y1="12" x2="37" y2="5" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="10" y1="12" x2="3" y2="5" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80"
              alt="Food bowl"
              className="relative z-10 rounded-full object-cover shadow-2xl"
              style={{ width: "360px", height: "360px" }}
            />
          </div>

          {/* RIGHT — Chat UI (4 cols) */}
          <div className="col-span-4 relative">
            {/* Dotted grid behind card */}
            <div className="absolute right-0 top-0 pointer-events-none opacity-30">
              {Array.from({ length: 8 }).map((_, row) => (
                <div key={row} className="flex gap-3 mb-3">
                  {Array.from({ length: 5 }).map((_, col) => (
                    <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: "#e8a0a0" }} />
                  ))}
                </div>
              ))}
            </div>

            {/* Chat card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600 mr-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
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

              {/* Messages — bubble style */}
              <div className="px-4 py-3 space-y-2">
                {/* Sent bubble (right) */}
                <div className="flex justify-end">
                  <div>
                    <p className="text-[10px] text-gray-400 text-right mb-1">12:30 PM</p>
                    <div className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm text-white max-w-[180px]" style={{ background: "#5a7a2e" }}>
                      What are we feeling today?
                    </div>
                  </div>
                </div>

                {/* Received bubbles */}
                {[
                  { user: "C", color: "bg-pink-200 text-pink-700", msg: "How about Sushi? 🍣", time: "12:31 PM" },
                  { user: "B", color: "bg-purple-200 text-purple-700", msg: "Works for me!", time: "12:32 PM" },
                  { user: "D", color: "bg-amber-200 text-amber-700", msg: "I'll add drinks", time: "12:33 PM" },
                ].map((m) => (
                  <div key={m.time} className="flex items-end gap-2">
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${m.color}`}>{m.user}</div>
                    <div>
                      <div className="px-3 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-800 bg-gray-100 max-w-[180px]">
                        {m.msg}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{m.time}</p>
                    </div>
                  </div>
                ))}

                {/* Sent bubble */}
                <div className="flex justify-end">
                  <div>
                    <div className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm text-white max-w-[190px]" style={{ background: "#5a7a2e" }}>
                      Perfect, I'll place the order 🙌
                    </div>
                    <p className="text-[10px] text-gray-400 text-right mt-0.5">12:34 PM</p>
                  </div>
                </div>

                {/* Order placed row */}
                <div className="flex items-center gap-2 pt-1 pb-0.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#5a7a2e" }}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#5a7a2e" }}>Order placed</span>
                  <span className="text-[10px] text-gray-400 ml-auto">12:45 PM</span>
                </div>
              </div>

              {/* Message input */}
              <div className="px-4 pb-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                  <button className="text-gray-400 hover:text-gray-600">
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
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div id="features" className="max-w-5xl mx-auto px-10 py-14">
        <h2 className="text-center font-black uppercase mb-10 tracking-wide" style={{ fontSize: "1.3rem", color: "#1a1a0e", letterSpacing: "0.05em" }}>
          EVERYTHING YOU NEED FOR{" "}
          <span style={{ color: "#e8834a" }}>STRESS-FREE</span>{" "}
          GROUP ORDERING
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              bgIcon: "#eef3e6",
              icon: (
                <svg className="w-6 h-6" style={{ color: "#5a7a2e" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              ),
              title: "GROUP ORDERING",
              desc: "Create or join groups by restaurant. Set a member cap and order deadline.",
            },
            {
              bgIcon: "#fdf0e8",
              icon: (
                <svg className="w-6 h-6" style={{ color: "#e8834a" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              ),
              title: "REAL-TIME CHAT",
              desc: "Decide together what to order live. No delays, no back-and-forth texting.",
            },
            {
              bgIcon: "#fde8ee",
              icon: (
                <svg className="w-6 h-6" style={{ color: "#e8507a" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              ),
              title: "DIETARY FILTERS",
              desc: "Filter groups by dietary restrictions, flex dollars, and time remaining.",
            },
            {
              bgIcon: "#fef3e2",
              icon: (
                <svg className="w-6 h-6" style={{ color: "#d4a020" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              ),
              title: "ONE EASY PAYMENT",
              desc: "Place one order and pay together. No more splitting headaches.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.bgIcon }}>
                  {card.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide" style={{ color: "#1a1a0e" }}>{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-10">
        <div className="border-t border-gray-200" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-10 py-14">
        <h2 className="text-center font-black uppercase mb-10 tracking-wide" style={{ fontSize: "1.3rem", color: "#1a1a0e", letterSpacing: "0.05em" }}>
          HOW IT WORKS
        </h2>
        <div className="grid grid-cols-3 gap-6 relative">
          {/* Dashed lines between steps */}
          <div className="absolute top-[28px] left-[36%] right-[36%] pointer-events-none z-0 flex items-center gap-1">
            <div className="flex-1 border-t-2 border-dashed border-gray-300" />
          </div>

          {[
            {
              num: "1",
              numBg: "#5a7a2e",
              icon: (
                <svg className="w-7 h-7" style={{ color: "#5a7a2e" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              ),
              iconBg: "#eef3e6",
              title: "CREATE OR JOIN A GROUP",
              desc: "Use your .edu email to get started.",
            },
            {
              num: "2",
              numBg: "#e8834a",
              icon: (
                <svg className="w-7 h-7" style={{ color: "#e8834a" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              ),
              iconBg: "#fdf0e8",
              title: "CHAT & DECIDE",
              desc: "Vote, chat, and lock in on a place to eat.",
            },
            {
              num: "3",
              numBg: "#e8507a",
              icon: (
                <svg className="w-7 h-7" style={{ color: "#e8507a" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ),
              iconBg: "#fde8ee",
              title: "ORDER & ENJOY",
              desc: "Place the order and the leader pays. You enjoy.",
            },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-4 relative z-10 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              {/* Number + icon stack */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: step.iconBg }}>
                  {step.icon}
                </div>
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center shadow" style={{ background: step.numBg }}>
                  {step.num}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide mb-1" style={{ color: "#1a1a0e" }}>{step.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BAR ── */}
      <div className="relative overflow-hidden border-t py-16 px-8" style={{ background: "#eef3e2", borderColor: "#d4e4b0" }}>
        {/* Paper plane */}
        <div className="absolute left-10 bottom-0 pointer-events-none">
          <svg width="150" height="130" viewBox="0 0 150 130" fill="none">
            <circle cx="45" cy="95" r="36" fill="#FDE68A" opacity="0.85"/>
            <g transform="translate(35, 18) rotate(-25, 40, 45)">
              <path d="M8 42 L82 8 L58 72 Z" fill="#5a7a2e" opacity="0.92"/>
              <path d="M8 42 L58 72 L42 52 Z" fill="#3d5a1e" opacity="0.85"/>
              <path d="M42 52 L58 72 L68 57 Z" fill="#8ab04e" opacity="0.75"/>
            </g>
            <path d="M18 95 Q52 62 94 32" stroke="#5a7a2e" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35" fill="none"/>
          </svg>
        </div>

        {/* Spark accents */}
        <svg className="absolute right-[200px] top-[24px] w-10 h-10 opacity-50 pointer-events-none" viewBox="0 0 40 40" fill="none">
          <line x1="20" y1="4" x2="20" y2="13" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="10" x2="37" y2="3" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="10" y1="10" x2="3" y2="3" stroke="#5a7a2e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>

        {/* Dotted grid right */}
        <div className="absolute right-8 bottom-4 pointer-events-none opacity-25">
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {Array.from({ length: 7 }).map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full" style={{ background: "#5a7a2e" }} />
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center">
          <p className="font-black mb-1 uppercase tracking-wide" style={{ fontSize: "1.6rem", color: "#1a1a0e" }}>
            Ready to order smarter with{" "}
            <span style={{ color: "#6b8f3e" }}>your crew?</span>
          </p>
          <p className="text-sm mb-7 mt-1" style={{ color: "#777" }}>Only for Barnard &amp; Columbia students</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-colors shadow-md"
            style={{ background: "#5a7a2e" }}
          >
            Create your account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <svg className="w-4 h-4" style={{ color: "#999" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-xs" style={{ color: "#999" }}>Only for Barnard and Columbia students</span>
          </div>
        </div>
      </div>

    </div>
  );
}

