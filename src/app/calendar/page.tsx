"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarDays = [
  { day: 24, month: "prev" }, { day: 25, month: "prev" }, { day: 26, month: "prev" }, { day: 27, month: "prev" }, { day: 28, month: "prev" }, { day: 1, month: "current" }, { day: 2, month: "current" },
  { day: 3, month: "current" }, { day: 4, month: "current", today: true, event: "scouting" }, { day: 5, month: "current" }, { day: 6, month: "current" }, { day: 7, month: "current", event: "fertilizer" }, { day: 8, month: "current" }, { day: 9, month: "current" },
  { day: 10, month: "current" }, { day: 11, month: "current" }, { day: 12, month: "current", event: "weeding" }, { day: 13, month: "current" }, { day: 14, month: "current" }, { day: 15, month: "current" }, { day: 16, month: "current" },
  { day: 17, month: "current" }, { day: 18, month: "current" }, { day: 19, month: "current" }, { day: 20, month: "current", event: "scouting" }, { day: 21, month: "current" }, { day: 22, month: "current" }, { day: 23, month: "current" },
  { day: 24, month: "current" }, { day: 25, month: "current" }, { day: 26, month: "current" }, { day: 27, month: "current" }, { day: 28, month: "current", event: "harvest" }, { day: 29, month: "current" }, { day: 30, month: "current" },
  { day: 31, month: "current" }, { day: 1, month: "next" }, { day: 2, month: "next" }, { day: 3, month: "next" }, { day: 4, month: "next" }, { day: 5, month: "next" }, { day: 6, month: "next" },
];

const events = [
  {
    id: "1",
    date: "04 Mar 2026",
    title: "Pest & Disease Scouting",
    description: "Weekly scouting for Fall Armyworm in Plot A",
    type: "scouting",
    icon: "search",
    color: "primary",
  },
  {
    id: "2",
    date: "07 Mar 2026",
    title: "Top Dressing Application",
    description: "Apply AN fertilizer — 150 kg/ha, Plot A (Maize at V6)",
    type: "fertilizer",
    icon: "science",
    color: "blue",
  },
  {
    id: "3",
    date: "12 Mar 2026",
    title: "Second Weeding",
    description: "Manual weeding — Plot A & Plot B",
    type: "weeding",
    icon: "grass",
    color: "amber",
  },
  {
    id: "4",
    date: "20 Mar 2026",
    title: "Pest Scouting",
    description: "Scout for aphids and bollworm — Plot B (Tomato)",
    type: "scouting",
    icon: "search",
    color: "primary",
  },
  {
    id: "5",
    date: "28 Mar 2026",
    title: "Expected Harvest Start",
    description: "Begin tomato harvest — Plot B (estimated 500 kg)",
    type: "harvest",
    icon: "agriculture",
    color: "rose",
  },
];

const eventColorMap: Record<string, string> = {
  scouting: "bg-primary/10 text-primary border-primary/20",
  fertilizer: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  weeding: "bg-amber-400/10 text-amber-500 border-amber-400/20",
  harvest: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

const dotColorMap: Record<string, string> = {
  scouting: "bg-primary",
  fertilizer: "bg-blue-500",
  weeding: "bg-amber-500",
  harvest: "bg-rose-500",
};

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "list">("month");

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div>
          <h1 className="text-xl font-bold leading-tight">Crop Calendar</h1>
          <p className="text-xs text-slate-500">March 2026</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("month")}
            className={`size-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              view === "month" ? "bg-primary text-background-dark glow" : "bg-slate-200/50 dark:bg-white/10 icon-btn"
            }`}
          >
            <span className="material-symbols-outlined text-xl">calendar_view_month</span>
          </button>
          <button
            onClick={() => setView("list")}
            className={`size-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              view === "list" ? "bg-primary text-background-dark glow" : "bg-slate-200/50 dark:bg-white/10 icon-btn"
            }`}
          >
            <span className="material-symbols-outlined text-xl">view_list</span>
          </button>
        </div>
      </header>

      {view === "month" && (
        <>
          {/* Month Navigation */}
          <section className="px-6 mt-4 mb-4">
            <div className="flex items-center justify-between">
              <button className="size-8 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <h2 className="text-lg font-bold">March 2026</h2>
              <button className="size-8 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </section>

          {/* Calendar Grid */}
          <section className="px-6 mb-6">
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 card">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold uppercase text-slate-400">
                    {d}
                  </div>
                ))}
              </div>
              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((d, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center justify-center h-10 rounded-lg text-sm ${
                      d.month !== "current"
                        ? "text-slate-300 dark:text-slate-600"
                        : d.today
                        ? "bg-primary text-background-dark font-bold"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {d.day}
                    {d.event && (
                      <div
                        className={`absolute bottom-0.5 size-1.5 rounded-full ${
                          dotColorMap[d.event] || "bg-slate-400"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Legend */}
      <section className="px-6 mb-4">
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Scouting", color: "bg-primary" },
            { label: "Fertilizer", color: "bg-blue-500" },
            { label: "Weeding", color: "bg-amber-500" },
            { label: "Harvest", color: "bg-rose-500" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`size-2 rounded-full ${item.color}`}></div>
              <span className="text-[10px] font-bold uppercase text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Events List */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          {view === "month" ? "Upcoming Events" : "All Events — March 2026"}
        </h2>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-xl border card ${eventColorMap[event.type] || "bg-white border-slate-100"}`}
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">{event.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold">{event.title}</p>
                    <p className="text-[10px] font-mono text-slate-500">{event.date}</p>
                  </div>
                  <p className="text-xs mt-1 opacity-70">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Event Button */}
      <section className="px-6">
        <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow">
          <span className="material-symbols-outlined">add</span>
          Add Calendar Event
        </button>
      </section>

      <BottomNav />
    </div>
  );
}
