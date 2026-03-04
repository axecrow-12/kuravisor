"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Top Section with Branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 border-2 border-primary/40 glow">
          <span className="material-symbols-outlined text-primary text-4xl">eco</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">KuraVisor</h1>
        <p className="text-sm text-slate-500 text-center max-w-xs">
          Offline Crop Doctor & Smart Farm Assistant for Smallholder Farmers
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-white dark:bg-white/5 rounded-t-3xl px-6 pt-8 pb-10 border-t border-primary/10 card">
        <h2 className="text-lg font-bold mb-6">Welcome Back</h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
              <span className="material-symbols-outlined text-slate-400 text-xl">phone</span>
              <input
                type="tel"
                placeholder="+263 7X XXX XXXX"
                className="bg-transparent flex-1 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              PIN
            </label>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
              <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter 4–6 digit PIN"
                className="bg-transparent flex-1 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow mt-2">
            <span className="material-symbols-outlined">login</span>
            Sign In
          </button>

          <button className="w-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 card">
            <span className="material-symbols-outlined">fingerprint</span>
            Use Fingerprint
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
