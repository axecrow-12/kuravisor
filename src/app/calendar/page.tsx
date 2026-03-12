"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const iconOptions = [
  { icon: "search", label: "Inspect", color: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" },
  { icon: "science", label: "Fertilize", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" },
  { icon: "grass", label: "Weeding", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" },
  { icon: "agriculture", label: "Harvest", color: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" },
  { icon: "water_drop", label: "Watering", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400" },
  { icon: "bug_report", label: "Pest Control", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400" },
];

type Task = {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const defaultTasks: Task[] = [
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(0);

  function handleAddTask() {
    if (!title.trim() || !date) return;
    const chosen = iconOptions[selectedIcon];
    const newTask: Task = {
      id: Date.now().toString(),
      date: formatDate(date),
      title: title.trim(),
      description: description.trim(),
      icon: chosen.icon,
      color: chosen.color,
    };
    setTasks((prev) => [...prev, newTask].sort((a, b) => {
      const parse = (d: string) => new Date(`${d} 2026`).getTime();
      return parse(a.date) - parse(b.date);
    }));
    setTitle("");
    setDescription("");
    setDate("");
    setSelectedIcon(0);
    setShowModal(false);
  }

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
          {tasks.map((event) => (
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
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-primary text-background-dark font-extrabold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg btn-glow"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
          Add New Task
        </button>
      </section>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-screen-sm bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-extrabold mb-5">New Task</h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Task Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Check for pests"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-base font-bold focus:outline-none focus:border-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Look for armyworm in the maize field"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-base focus:outline-none focus:border-primary"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-1 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-base font-bold focus:outline-none focus:border-primary"
                />
              </div>

              {/* Icon Picker */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {iconOptions.map((opt, i) => (
                    <button
                      key={opt.icon}
                      type="button"
                      onClick={() => setSelectedIcon(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                        selectedIcon === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-slate-200 dark:border-white/10 text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 font-extrabold text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!title.trim() || !date}
                className="flex-1 py-4 rounded-2xl bg-primary text-background-dark font-extrabold text-base disabled:opacity-40"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
