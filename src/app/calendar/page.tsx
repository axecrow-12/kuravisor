"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const events = [
  {
    id: "1",
    date: "04 Mar",
    title: "Check for Pests",
    description: "Look for armyworm in the maize field",
    icon: "search",
    color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  },
  {
    id: "2",
    date: "07 Mar",
    title: "Add Fertilizer",
    description: "Put fertilizer on the maize — 150 kg per hectare",
    icon: "science",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    id: "3",
    date: "12 Mar",
    title: "Remove Weeds",
    description: "Pull out weeds from all fields",
    icon: "grass",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    id: "4",
    date: "20 Mar",
    title: "Check Tomatoes",
    description: "Look for bugs on tomato plants",
    icon: "search",
    color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  },
  {
    id: "5",
    date: "28 Mar",
    title: "Start Harvest",
    description: "Tomatoes should be ready to pick",
    icon: "agriculture",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  },
];

export default function CalendarPage() {
  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <header className="p-6 pt-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex size-12 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold">Crop Calendar</h1>
          <p className="text-base text-slate-500">March 2026</p>
        </div>
      </header>

      {/* This Month's Tasks */}
      <section className="px-6 mt-2">
        <h2 className="text-xl font-extrabold mb-4">Things To Do</h2>
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 card`}
            >
              <div className="flex items-start gap-4">
                <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${event.color}`}>
                  <span className="material-symbols-outlined text-2xl">{event.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-bold">{event.title}</p>
                    <span className="text-base text-slate-500 font-bold shrink-0 ml-2">{event.date}</span>
                  </div>
                  <p className="text-base text-slate-500 mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Task */}
      <section className="px-6 mt-6">
        <button className="w-full bg-primary text-background-dark font-extrabold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg btn-glow">
          <span className="material-symbols-outlined text-2xl">add</span>
          Add New Task
        </button>
      </section>

      <BottomNav />
    </div>
  );
}
