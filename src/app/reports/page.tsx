import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finances",
};

const recentItems = [
  { label: "Sold tomatoes", amount: "+$280", type: "income", date: "01 Mar" },
  { label: "Bought fertilizer", amount: "-$120", type: "expense", date: "27 Feb" },
  { label: "Sold maize", amount: "+$560", type: "income", date: "20 Feb" },
  { label: "Paid workers", amount: "-$95", type: "expense", date: "15 Feb" },
  { label: "Sold tomatoes", amount: "+$150", type: "income", date: "10 Feb" },
  { label: "Bought seeds", amount: "-$60", type: "expense", date: "05 Feb" },
];

export default function ReportsPage() {
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
          <h1 className="text-2xl font-extrabold">My Finances</h1>
          <p className="text-base text-slate-500">See how your money is doing</p>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="px-6 mt-4 mb-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Total Profit */}
          <div className="bg-primary text-background-dark p-6 rounded-2xl">
            <p className="text-base font-bold opacity-80">Total Profit This Year</p>
            <p className="text-4xl font-extrabold mt-1">$1,235</p>
            <p className="text-base mt-2 opacity-70">You are doing well! Keep it up.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Money In */}
            <div className="bg-green-50 dark:bg-green-500/10 p-5 rounded-2xl border-2 border-green-200 dark:border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-green-600 text-2xl">arrow_downward</span>
                <p className="text-base font-bold text-green-700 dark:text-green-400">Money In</p>
              </div>
              <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">$2,250</p>
              <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-1">From selling crops</p>
            </div>

            {/* Money Out */}
            <div className="bg-red-50 dark:bg-red-500/10 p-5 rounded-2xl border-2 border-red-200 dark:border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-red-600 text-2xl">arrow_upward</span>
                <p className="text-base font-bold text-red-700 dark:text-red-400">Money Out</p>
              </div>
              <p className="text-2xl font-extrabold text-red-700 dark:text-red-400">$1,015</p>
              <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">For seeds, tools, etc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Money Went */}
      <section className="px-6 mb-6">
        <h2 className="text-xl font-extrabold mb-4">Where Money Went</h2>
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-slate-100 dark:border-white/10 space-y-4">
          {[
            { label: "Fertilizer", amount: "$274", pct: 27, color: "bg-green-500" },
            { label: "Workers", amount: "$253", pct: 25, color: "bg-blue-500" },
            { label: "Seeds", amount: "$132", pct: 13, color: "bg-amber-500" },
            { label: "Pest Spray", amount: "$112", pct: 11, color: "bg-red-500" },
            { label: "Transport", amount: "$81", pct: 8, color: "bg-purple-500" },
            { label: "Other", amount: "$163", pct: 16, color: "bg-slate-400" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-base font-bold">{item.label}</span>
                <span className="text-base font-bold">{item.amount}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-6 mb-6">
        <h2 className="text-xl font-extrabold mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {recentItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border-2 border-slate-100 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center ${
                  item.type === "income"
                    ? "bg-green-100 dark:bg-green-500/10"
                    : "bg-red-100 dark:bg-red-500/10"
                }`}>
                  <span className={`material-symbols-outlined text-xl ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.type === "income" ? "arrow_downward" : "arrow_upward"}
                  </span>
                </div>
                <div>
                  <p className="text-base font-bold">{item.label}</p>
                  <p className="text-sm text-slate-400">{item.date}</p>
                </div>
              </div>
              <p className={`text-lg font-extrabold ${
                item.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
