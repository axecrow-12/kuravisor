/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "KuraVisor - Home",
};

export default function Home() {
  return (
    <div className="min-h-screen pb-28 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="p-6 pt-8">
        <p className="text-base text-slate-500">Hello,</p>
        <h1 className="text-3xl font-extrabold leading-tight">Musa 👋</h1>
        <p className="text-base text-slate-500 mt-1">What would you like to do today?</p>
      </header>

      {/* 4 Main Blocks */}
      <section className="px-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Dashboard */}
          <Link
            href="/farm-records"
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-white/5 p-8 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[160px]"
          >
            <div className="size-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-blue-600 dark:text-blue-400 fill-1">dashboard</span>
            </div>
            <span className="text-lg font-bold text-center">My Farm</span>
          </Link>

          {/* Crop Doctor AI */}
          <Link
            href="/crop-doctor"
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-white/5 p-8 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[160px]"
          >
            <div className="size-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400 fill-1">local_hospital</span>
            </div>
            <span className="text-lg font-bold text-center">Crop Doctor</span>
          </Link>

          {/* Finances */}
          <Link
            href="/reports"
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-white/5 p-8 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[160px]"
          >
            <div className="size-16 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-amber-600 dark:text-amber-400 fill-1">payments</span>
            </div>
            <span className="text-lg font-bold text-center">Finances</span>
          </Link>

          {/* Crop Calendar */}
          <Link
            href="/calendar"
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-white/5 p-8 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[160px]"
          >
            <div className="size-16 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-rose-600 dark:text-rose-400 fill-1">calendar_month</span>
            </div>
            <span className="text-lg font-bold text-center">Calendar</span>
          </Link>
        </div>
      </section>

      {/* Quick Tip */}
      <section className="px-6 mt-8">
        <div className="bg-primary/10 border border-primary/20 p-5 rounded-2xl">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-3xl mt-0.5">lightbulb</span>
            <div>
              <p className="font-bold text-base">Tip of the Day</p>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
                Check your crops every week for pests. Early spotting means less damage and more harvest!
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
