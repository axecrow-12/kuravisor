"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <h1 className="text-xl font-bold leading-tight">Settings</h1>
      </header>

      <div className="px-6 mt-4 space-y-6">
        {/* Profile Section */}
        <Link
          href="/profile"
          className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
        >
          <div className="size-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Musa Ndlovu</p>
            <p className="text-xs text-slate-500">+263 77 234 5678 • Smallholder #4492</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </Link>

        {/* Sync Status */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Cloud & Sync</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
            <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">sync</span>
                <div>
                  <p className="text-sm font-bold">Sync Status</p>
                  <p className="text-xs text-slate-500">Last synced: 04 Mar 2026, 14:02 UTC</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">UP TO DATE</span>
            </div>
            <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">pending_actions</span>
                <div>
                  <p className="text-sm font-bold">Pending Changes</p>
                  <p className="text-xs text-slate-500">3 records waiting to sync</p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-500">3</span>
            </div>
            <button className="w-full p-4 flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-lg">cloud_upload</span>
              Sync Now
            </button>
          </div>
        </div>

        {/* Language */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Language / Mutauro / Ulimi</h2>
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

        {/* Font Size */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Font Size</h2>
          <div className="grid grid-cols-3 gap-2">
            <button className="py-3 rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold text-xs border-2 border-transparent chip-hover">
              Small
            </button>
            <button className="py-3 rounded-xl bg-primary text-background-dark font-bold text-sm border-2 border-primary btn-glow">
              Medium
            </button>
            <button className="py-3 rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold text-base border-2 border-transparent chip-hover">
              Large
            </button>
          </div>
        </div>

        {/* App Sections */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">App</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
            <Link href="/knowledge-base" className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">menu_book</span>
                <p className="text-sm font-bold">Knowledge Base</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
            <Link href="/agro-dealers" className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">store</span>
                <p className="text-sm font-bold">Agro-Dealer Directory</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
            <Link href="/scan-history" className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">history</span>
                <p className="text-sm font-bold">Scan History</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </Link>
            <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">notifications</span>
                <p className="text-sm font-bold">Notifications</p>
              </div>
              <div className="w-11 h-6 bg-primary rounded-full p-0.5 flex items-center">
                <div className="size-5 bg-white rounded-full shadow ml-auto"></div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">dark_mode</span>
                <p className="text-sm font-bold">Dark Mode</p>
              </div>
              <div className="w-11 h-6 bg-slate-200 dark:bg-primary rounded-full p-0.5 flex items-center">
                <div className="size-5 bg-white rounded-full shadow dark:ml-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Data & Privacy</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
            <button className="w-full p-4 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 text-left">
              <span className="material-symbols-outlined text-slate-500">download</span>
              <div>
                <p className="text-sm font-bold">Export Data</p>
                <p className="text-xs text-slate-500">Download as JSON/CSV</p>
              </div>
            </button>
            <button className="w-full p-4 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 text-left">
              <span className="material-symbols-outlined text-slate-500">sd_storage</span>
              <div>
                <p className="text-sm font-bold">Backup to SD Card</p>
                <p className="text-xs text-slate-500">Save local backup</p>
              </div>
            </button>
            <button className="w-full p-4 flex items-center gap-3 text-left">
              <span className="material-symbols-outlined text-rose-500">delete_forever</span>
              <div>
                <p className="text-sm font-bold text-rose-500">Delete Account</p>
                <p className="text-xs text-slate-500">Remove all data permanently</p>
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center pb-4">
          <p className="text-xs text-slate-400 font-mono">KuraVisor v1.0.0</p>
          <p className="text-[10px] text-slate-400 mt-1">© 2026 KuraVisor Team</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
