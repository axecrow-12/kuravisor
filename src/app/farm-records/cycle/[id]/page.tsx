import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Cycle Details",
};

const expenses = [
  { category: "Seeds", amount: 65, percentage: 13 },
  { category: "Fertilizer", amount: 130, percentage: 27 },
  { category: "Pesticide", amount: 55, percentage: 11 },
  { category: "Labour", amount: 120, percentage: 25 },
  { category: "Transport", amount: 40, percentage: 8 },
  { category: "Land Prep", amount: 50, percentage: 10 },
  { category: "Irrigation", amount: 25, percentage: 5 },
];

const harvests = [
  { date: "20 Feb 2026", quantity: "650 kg", grade: "Grade A", storage: "Shed A" },
  { date: "28 Feb 2026", quantity: "480 kg", grade: "Grade B", storage: "Shed A" },
];

export default function CropCyclePage() {
  const totalExpenses = 485;
  const totalIncome = 1260;
  const netProfit = totalIncome - totalExpenses;
  const plotSize = 0.8;
  const profitPerHa = netProfit / plotSize;
  const totalHarvest = 1130;
  const costPerKg = totalExpenses / totalHarvest;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/farm-records"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div>
            <h1 className="text-lg font-bold leading-tight">Plot A — Main Field</h1>
            <p className="text-xs text-slate-500">Maize • 0.8 ha • 2025/26 Summer</p>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="px-6 mt-4 mb-6">
        <div className="bg-primary text-background-dark p-5 rounded-2xl relative overflow-hidden mb-3 glow">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <span className="material-symbols-outlined text-7xl">agriculture</span>
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Net Profit</p>
            <p className="text-4xl font-mono font-bold">${netProfit}</p>
            <div className="flex gap-6 mt-4">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-60">Per Hectare</p>
                <p className="font-mono font-bold">${profitPerHa.toFixed(0)}/ha</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase opacity-60">ROI</p>
                <p className="font-mono font-bold">{((netProfit / totalExpenses) * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase opacity-60">Cost/kg</p>
                <p className="font-mono font-bold">${costPerKg.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Total Expenses</p>
            <p className="text-xl font-mono font-bold text-rose-500">${totalExpenses}</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Total Income</p>
            <p className="text-xl font-mono font-bold text-primary">${totalIncome}</p>
          </div>
        </div>
      </section>

      {/* Expense Breakdown */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Expense Breakdown</h2>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 space-y-3 card">
          {expenses.map((exp) => (
            <div key={exp.category}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold">{exp.category}</span>
                <span className="text-xs font-mono text-slate-500">${exp.amount} ({exp.percentage}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/70 rounded-full"
                  style={{ width: `${exp.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Harvest Records */}
      <section className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Harvests</h2>
          <p className="text-xs font-mono font-bold text-primary">{totalHarvest} kg total</p>
        </div>
        <div className="space-y-2">
          {harvests.map((harvest, i) => (
            <div key={i} className="flex items-center gap-3 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card">
              <div className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">warehouse</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{harvest.quantity}</p>
                <p className="text-xs text-slate-500">{harvest.date} • {harvest.grade}</p>
              </div>
              <p className="text-xs text-slate-400">{harvest.storage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="px-6 space-y-3">
        <Link
          href="/farm-records/add"
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <span className="material-symbols-outlined">add</span>
          Add Record
        </Link>
        <Link
          href="/reports"
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 card"
        >
          <span className="material-symbols-outlined">picture_as_pdf</span>
          Export Report (PDF)
        </Link>
      </section>

      <BottomNav />
    </div>
  );
}
