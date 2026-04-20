import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <span className="text-lg font-medium text-blue-700 tracking-tight">
          CodeCollab
        </span>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center px-8 pt-20 pb-12">
        <span className="inline-block bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-5">
          Barnard & Columbia only
        </span>
        <h1 className="text-5xl font-medium text-gray-900 leading-tight tracking-tight mb-4">
          Order food together,{" "}
          <span className="text-blue-700">without the chaos</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8">
          Create a group, pick a restaurant, chat with your crew in real time,
          and place one order. No more 47-message group chats.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/signup"
            className="px-7 py-3 bg-blue-700 text-white rounded-lg font-medium text-base hover:bg-blue-800 transition-colors"
          >
            Get started free
          </Link>
          <Link
            href="/login"
            className="px-7 py-3 border border-gray-200 text-gray-700 rounded-lg text-base hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 px-8 pb-12">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">Group ordering</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Create or join groups by restaurant. Set a member cap and order deadline.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">Real-time chat</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Decide together what to order live. No delays, no back-and-forth texting.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">Dietary filters</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Filter groups by dietary restrictions, flex dollars, and time remaining.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="border-t border-gray-100" />
      </div>

      {/* How it works */}
      <div className="max-w-3xl mx-auto text-center px-8 py-12">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">How it works</h2>
        <div className="grid grid-cols-4 gap-6">
          {[
            { num: "1", title: "Sign up", desc: "Use your .edu email to join" },
            { num: "2", title: "Find a group", desc: "Browse open groups or create one" },
            { num: "3", title: "Chat & order", desc: "Decide together, then place the order" },
            { num: "4", title: "Done!", desc: "Leader dissolves the group when finished" },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-sm font-medium flex items-center justify-center mb-3">
                {step.num}
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-blue-50 border-t border-blue-100 py-10 text-center px-8">
        <p className="text-base font-medium text-blue-800 mb-4">
          Ready to order smarter with your campus crew?
        </p>
        <Link
          href="/signup"
          className="inline-block px-7 py-3 bg-blue-700 text-white rounded-lg font-medium text-base hover:bg-blue-800 transition-colors"
        >
          Create your account
        </Link>
      </div>
    </div>
  );
}

