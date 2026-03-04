"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <h1 className="text-xl font-bold leading-tight">Profile</h1>
        </div>
        <button className="text-primary text-sm font-bold">Edit</button>
      </header>

      {/* Profile Card */}
      <section className="px-6 mt-4 mb-6">
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
          <div className="size-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4 glow">
            <span className="material-symbols-outlined text-primary text-4xl">person</span>
          </div>
          <h2 className="text-xl font-bold">Musa Ndlovu</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Smallholder ID: #4492</p>
          <p className="text-xs text-slate-500 mt-1">+263 77 234 5678</p>
        </div>
      </section>

      {/* Farm Details */}
      <section className="px-6 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Farm Details</h2>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500">location_on</span>
              <div>
                <p className="text-xs text-slate-400 uppercase">Location</p>
                <p className="text-sm font-bold">Mashonaland East, Zimbabwe</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500">straighten</span>
              <div>
                <p className="text-xs text-slate-400 uppercase">Total Farm Size</p>
                <p className="text-sm font-bold">1.6 hectares</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500">grid_view</span>
              <div>
                <p className="text-xs text-slate-400 uppercase">Number of Plots</p>
                <p className="text-sm font-bold">3 plots</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500">eco</span>
              <div>
                <p className="text-xs text-slate-400 uppercase">Primary Crops</p>
                <p className="text-sm font-bold">Maize, Tomato, Groundnut</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-500">my_location</span>
              <div>
                <p className="text-xs text-slate-400 uppercase">GPS Coordinates</p>
                <p className="text-sm font-bold font-mono">-1.2921, 36.8219</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Summary */}
      <section className="px-6 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Activity Summary</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-2xl font-mono font-bold text-primary">24</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Scans</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-2xl font-mono font-bold text-primary">47</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Records</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-2xl font-mono font-bold text-primary">3</p>
            <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Cycles</p>
          </div>
        </div>
      </section>

      {/* Edit Profile Form */}
      <section className="px-6 space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Full Name</label>
          <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
            <span className="material-symbols-outlined text-slate-400">person</span>
            <input type="text" defaultValue="Musa Ndlovu" className="bg-transparent flex-1 text-sm font-medium outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Phone Number</label>
          <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
            <span className="material-symbols-outlined text-slate-400">phone</span>
            <input type="tel" defaultValue="+263 77 234 5678" className="bg-transparent flex-1 text-sm font-medium outline-none" />
          </div>
        </div>
        <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow">
          <span className="material-symbols-outlined">save</span>
          Save Changes
        </button>
      </section>

      <BottomNav />
    </div>
  );
}
