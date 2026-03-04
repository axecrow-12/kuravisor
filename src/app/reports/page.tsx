import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit/Loss Reports",
};

const cycleComparison = [
  { cycle: "2025/26 Summer", crop: "Maize", income: 1260, expenses: 485, profit: 775 },
  { cycle: "2025/26 Summer", crop: "Tomato", income: 580, expenses: 210, profit: 370 },
  { cycle: "2024/25 Summer", crop: "Groundnut", income: 410, expenses: 320, profit: 90 },
  { cycle: "2024/25 Winter", crop: "Wheat", income: 690, expenses: 540, profit: 150 },
];

const monthlyData = [
  { month: "Sep", income: 0, expenses: 120 },
  { month: "Oct", income: 0, expenses: 180 },
  { month: "Nov", income: 0, expenses: 95 },
  { month: "Dec", income: 150, expenses: 60 },
  { month: "Jan", income: 280, expenses: 45 },
  { month: "Feb", income: 560, expenses: 30 },
  { month: "Mar", income: 270, expenses: 15 },
];

export default function ReportsPage() {
  const totalIncome = 2250;
  const totalExpenses = 1015;
  const netProfit = totalIncome - totalExpenses;

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
            <h1 className="text-xl font-bold leading-tight">Reports</h1>
            <p className="text-xs text-slate-500">Financial Performance</p>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
          <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
        </button>
      </header>

      {/* Overall Summary */}
      <section className="px-6 mt-4 mb-6">
        <div className="bg-primary text-background-dark p-6 rounded-2xl relative overflow-hidden glow">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <span className="material-symbols-outlined text-8xl">trending_up</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Annual Farm Profit (2025/26)</p>
          <p className="text-5xl font-mono font-bold mb-4">${netProfit}</p>
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">Income</p>
              <p className="font-mono font-bold">${totalIncome}</p>
            </div>
            <div className="w-px h-8 bg-background-dark/20"></div>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">Expenses</p>
              <p className="font-mono font-bold">${totalExpenses}</p>
            </div>
            <div className="w-px h-8 bg-background-dark/20"></div>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">ROI</p>
              <p className="font-mono font-bold">{((netProfit / totalExpenses) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Income vs Expenses Chart */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Monthly Trend</h2>
        <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card">
          <div className="flex items-end gap-1 h-40">
            {monthlyData.map((m) => {
              const maxVal = 600;
              const incomeH = (m.income / maxVal) * 100;
              const expenseH = (m.expenses / maxVal) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: "120px" }}>
                    <div
                      className="flex-1 bg-primary/70 rounded-t"
                      style={{ height: `${Math.max(incomeH, 2)}%` }}
                    ></div>
                    <div
                      className="flex-1 bg-rose-400/70 rounded-t"
                      style={{ height: `${Math.max(expenseH, 2)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-3">
            <div className="flex items-center gap-1">
              <div className="size-2 bg-primary/70 rounded-full"></div>
              <span className="text-[10px] text-slate-500">Income</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 bg-rose-400/70 rounded-full"></div>
              <span className="text-[10px] text-slate-500">Expenses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Crop Cycle Comparison */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Cycle Comparison</h2>
        <div className="space-y-2">
          {cycleComparison.map((cycle, i) => (
            <div
              key={i}
              className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-bold">{cycle.crop}</p>
                  <p className="text-xs text-slate-500">{cycle.cycle}</p>
                </div>
                <p className={`text-lg font-mono font-bold ${cycle.profit >= 0 ? "text-primary" : "text-rose-500"}`}>
                  ${cycle.profit}
                </p>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{ width: `${(cycle.income / 1500) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-mono">
                <span>Expenses: ${cycle.expenses}</span>
                <span>Income: ${cycle.income}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expense Category Breakdown (Pie Chart Approximation) */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Expense Breakdown (All Plots)</h2>
        <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Fertilizer", pct: 27, color: "bg-primary" },
              { label: "Labour", pct: 25, color: "bg-blue-500" },
              { label: "Seeds", pct: 13, color: "bg-amber-500" },
              { label: "Pesticide", pct: 11, color: "bg-rose-500" },
              { label: "Land Prep", pct: 10, color: "bg-purple-500" },
              { label: "Transport", pct: 8, color: "bg-cyan-500" },
              { label: "Irrigation", pct: 5, color: "bg-orange-500" },
              { label: "Other", pct: 1, color: "bg-slate-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`size-3 rounded-full ${item.color} shrink-0`}></div>
                <span className="text-xs">{item.label}</span>
                <span className="text-xs font-mono text-slate-400 ml-auto">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
