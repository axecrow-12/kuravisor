import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan History",
};

const scanHistory = [
  {
    id: "1",
    date: "04 Mar 2026",
    time: "14:32",
    crop: "Maize",
    diagnosis: "Fall Armyworm",
    confidence: 92,
    severity: "High",
    severityColor: "rose",
  },
  {
    id: "2",
    date: "02 Mar 2026",
    time: "09:15",
    crop: "Tomato",
    diagnosis: "Early Blight",
    confidence: 87,
    severity: "Medium",
    severityColor: "amber",
  },
  {
    id: "3",
    date: "28 Feb 2026",
    time: "16:45",
    crop: "Maize",
    diagnosis: "Healthy",
    confidence: 96,
    severity: "None",
    severityColor: "primary",
  },
  {
    id: "4",
    date: "25 Feb 2026",
    time: "11:20",
    crop: "Potato",
    diagnosis: "Late Blight",
    confidence: 89,
    severity: "Critical",
    severityColor: "rose",
  },
  {
    id: "5",
    date: "22 Feb 2026",
    time: "08:30",
    crop: "Groundnut",
    diagnosis: "Leaf Spot",
    confidence: 78,
    severity: "Low",
    severityColor: "blue",
  },
  {
    id: "6",
    date: "20 Feb 2026",
    time: "13:10",
    crop: "Maize",
    diagnosis: "Nitrogen Deficiency",
    confidence: 84,
    severity: "Medium",
    severityColor: "amber",
  },
];

export default function ScanHistoryPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Scan History</h1>
            <p className="text-xs text-slate-500">{scanHistory.length} scans recorded</p>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
          <span className="material-symbols-outlined text-xl">filter_list</span>
        </button>
      </header>

      {/* Filter Chips */}
      <section className="px-6 mt-4 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          <button className="px-4 py-2 bg-primary text-background-dark text-xs font-bold rounded-full shrink-0 btn-glow">All Crops</button>
          <button className="px-4 py-2 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-white/10 shrink-0 chip-hover">Maize</button>
          <button className="px-4 py-2 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-white/10 shrink-0 chip-hover">Tomato</button>
          <button className="px-4 py-2 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-white/10 shrink-0 chip-hover">Potato</button>
          <button className="px-4 py-2 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-white/10 shrink-0 chip-hover">Groundnut</button>
        </div>
      </section>

      {/* Scan List */}
      <section className="px-6 space-y-3">
        {scanHistory.map((scan) => (
          <Link
            key={scan.id}
            href="/crop-doctor/results"
            className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 items-center group card-interactive"
          >
            <div
              className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${
                scan.diagnosis === "Healthy"
                  ? "bg-primary/10 text-primary"
                  : scan.severityColor === "rose"
                  ? "bg-rose-500/10 text-rose-500"
                  : scan.severityColor === "amber"
                  ? "bg-amber-400/10 text-amber-500"
                  : "bg-blue-400/10 text-blue-500"
              }`}
            >
              <span className="material-symbols-outlined">
                {scan.diagnosis === "Healthy" ? "check_circle" : "bug_report"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{scan.diagnosis}</p>
              <p className="text-xs text-slate-500">
                {scan.crop} • {scan.date}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-mono font-bold text-slate-700 dark:text-slate-300">
                {scan.confidence}%
              </p>
              <p
                className={`text-[10px] font-bold uppercase ${
                  scan.severity === "None"
                    ? "text-primary"
                    : scan.severityColor === "rose"
                    ? "text-rose-500"
                    : scan.severityColor === "amber"
                    ? "text-amber-500"
                    : "text-blue-500"
                }`}
              >
                {scan.severity === "None" ? "Healthy" : scan.severity}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}
