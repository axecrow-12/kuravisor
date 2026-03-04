import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm Records",
};

const plots = [
  {
    id: "plot-a",
    name: "Plot A — Main Field",
    size: "0.8 ha",
    crop: "Maize",
    cycle: "2025/26 Summer",
    totalExpenses: 485,
    totalIncome: 1260,
    status: "active",
  },
  {
    id: "plot-b",
    name: "Plot B — Garden",
    size: "0.3 ha",
    crop: "Tomato",
    cycle: "2025/26 Summer",
    totalExpenses: 210,
    totalIncome: 580,
    status: "active",
  },
  {
    id: "plot-c",
    name: "Plot C — Vlei",
    size: "0.5 ha",
    crop: "Groundnut",
    cycle: "2024/25 Summer",
    totalExpenses: 320,
    totalIncome: 410,
    status: "completed",
  },
];

const recentRecords = [
  { id: "1", type: "expense", category: "Fertilizer", description: "AN Top Dressing — 50kg", amount: 45, date: "03 Mar 2026", currency: "USD" },
  { id: "2", type: "income", category: "Crop Sales", description: "Tomato sales — 120kg", amount: 180, date: "01 Mar 2026", currency: "USD" },
  { id: "3", type: "expense", category: "Labour", description: "Weeding — 3 workers", amount: 30, date: "28 Feb 2026", currency: "USD" },
  { id: "4", type: "expense", category: "Pesticide", description: "Belt Expert — 250ml", amount: 22, date: "25 Feb 2026", currency: "USD" },
  { id: "5", type: "income", category: "Crop Sales", description: "Groundnut — 200kg", amount: 320, date: "20 Feb 2026", currency: "USD" },
];

export default function FarmRecordsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div>
          <h1 className="text-xl font-bold leading-tight">Farm Records</h1>
          <p className="text-xs text-slate-500">{plots.length} plots • 2 active cycles</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/reports"
            className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined text-xl">bar_chart</span>
          </Link>
          <Link
            href="/farm-records/add"
            className="size-10 flex items-center justify-center rounded-full bg-primary text-background-dark glow"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </Link>
        </div>
      </header>

      {/* Financial Summary Cards */}
      <section className="px-6 mt-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Expenses</p>
            <p className="text-xl font-mono font-bold text-rose-500">$1,015</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Income</p>
            <p className="text-xl font-mono font-bold text-primary">$2,250</p>
          </div>
          <div className="bg-primary text-background-dark p-4 rounded-2xl text-center glow">
            <p className="text-[10px] font-bold uppercase opacity-70 mb-1">Profit</p>
            <p className="text-xl font-mono font-bold">$1,235</p>
          </div>
        </div>
      </section>

      {/* Farm Plots */}
      <section className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Farm Plots</h2>
          <Link href="/farm-records/plots" className="text-primary text-xs font-bold flex items-center">
            VIEW ALL <span className="material-symbols-outlined text-sm ml-1">arrow_forward_ios</span>
          </Link>
        </div>
        <div className="space-y-3">
          {plots.map((plot) => (
            <Link
              key={plot.id}
              href={`/farm-records/cycle/${plot.id}`}
              className="block bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card-interactive"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold">{plot.name}</p>
                  <p className="text-xs text-slate-500">
                    {plot.crop} • {plot.size} • {plot.cycle}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                    plot.status === "active"
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 dark:bg-white/10 text-slate-500"
                  }`}
                >
                  {plot.status}
                </span>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Spent</p>
                  <p className="text-sm font-mono font-bold text-rose-500">${plot.totalExpenses}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Earned</p>
                  <p className="text-sm font-mono font-bold text-primary">${plot.totalIncome}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">Net</p>
                  <p className={`text-sm font-mono font-bold ${plot.totalIncome - plot.totalExpenses >= 0 ? "text-primary" : "text-rose-500"}`}>
                    ${plot.totalIncome - plot.totalExpenses}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Recent Transactions</h2>
        </div>
        <div className="space-y-2">
          {recentRecords.map((record) => (
            <div
              key={record.id}
              className="flex items-center gap-3 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card"
            >
              <div
                className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                  record.type === "expense"
                    ? "bg-rose-500/10 text-rose-500"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {record.type === "expense" ? "arrow_upward" : "arrow_downward"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{record.description}</p>
                <p className="text-xs text-slate-500">{record.category} • {record.date}</p>
              </div>
              <p
                className={`text-sm font-mono font-bold ${
                  record.type === "expense" ? "text-rose-500" : "text-primary"
                }`}
              >
                {record.type === "expense" ? "-" : "+"}${record.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
