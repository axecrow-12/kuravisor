"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Top Branding */}
      <div className="px-6 pt-12 pb-6 flex flex-col items-center">
        <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 border-2 border-primary/40 glow">
          <span className="material-symbols-outlined text-primary text-3xl">person_add</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Create Account</h1>
        <p className="text-xs text-slate-500 text-center">
          Register offline — sync when connected
        </p>
      </div>

      {/* Registration Form */}
      <div className="flex-1 bg-white dark:bg-white/5 rounded-t-3xl px-6 pt-8 pb-10 border-t border-primary/10 card">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Full Name
            </label>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
              <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
              <input
                type="text"
                placeholder="Enter your name"
                className="bg-transparent flex-1 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

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
              Create PIN (4–6 digits)
            </label>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
              <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
              <input
                type="password"
                maxLength={6}
                placeholder="Create your PIN"
                className="bg-transparent flex-1 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Confirm PIN
            </label>
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
              <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
              <input
                type="password"
                maxLength={6}
                placeholder="Confirm your PIN"
                className="bg-transparent flex-1 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Language / Mutauro / Ulimi
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-3 rounded-xl bg-primary text-background-dark font-bold text-sm border-2 border-primary btn-glow">
                English
              </button>
              <button className="py-3 rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold text-sm border-2 border-transparent chip-hover">
                Shona
              </button>
              <button className="py-3 rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold text-sm border-2 border-transparent chip-hover">
                Ndebele
              </button>
            </div>
          </div>

          <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow mt-2">
            <span className="material-symbols-outlined">how_to_reg</span>
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="text-primary font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
