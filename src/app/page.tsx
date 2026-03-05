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
      <header className="p-6 pt-8 flex items-start justify-between">
        <div>
          <p className="text-base text-slate-500">Hello,</p>
          <h1 className="text-3xl font-extrabold leading-tight">Musa 👋</h1>
          <p className="text-base text-slate-500 mt-1">What would you like to do today?</p>
        </div>
        <Link
          href="/settings"
          className="size-14 bg-slate-200/60 dark:bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-1"
        >
          <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-slate-300">person</span>
        </Link>
      </header>

      {/* 4 Main Blocks */}
      <section className="px-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {/* My Farm */}
          <Link
            href="/farm-records"
            className="flex flex-col gap-3 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[180px]"
          >
            <div className="size-14 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400 fill-1">dashboard</span>
            </div>
            <span className="text-lg font-extrabold">My Farm</span>
            <p className="text-sm text-slate-500 leading-snug">Maize growing well. 2 plots active this season.</p>
          </Link>

          {/* Crop Doctor */}
          <Link
            href="/crop-doctor"
            className="flex flex-col gap-3 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[180px]"
          >
            <div className="size-14 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400 fill-1">local_hospital</span>
            </div>
            <span className="text-lg font-extrabold">Crop Doctor</span>
            <p className="text-sm text-slate-500 leading-snug">Last scan: Healthy. 5 scans done so far.</p>
          </Link>

          {/* Finances */}
          <Link
            href="/reports"
            className="flex flex-col gap-3 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[180px]"
          >
            <div className="size-14 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-amber-600 dark:text-amber-400 fill-1">payments</span>
            </div>
            <span className="text-lg font-extrabold">Finances</span>
            <p className="text-sm text-slate-500 leading-snug">Profit: $1,235. You earned more than you spent.</p>
          </Link>

          {/* Calendar */}
          <Link
            href="/calendar"
            className="flex flex-col gap-3 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 card-interactive min-h-[180px]"
          >
            <div className="size-14 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-rose-600 dark:text-rose-400 fill-1">calendar_month</span>
            </div>
            <span className="text-lg font-extrabold">Calendar</span>
            <p className="text-sm text-slate-500 leading-snug">Next task: Check for pests on 04 Mar.</p>
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
