"use client";

import Link from "next/link";
import { useState } from "react";

const expenseCategories = [
  { id: "seeds", label: "Seeds", icon: "grass" },
  { id: "fertilizer", label: "Fertilizer", icon: "science" },
  { id: "pesticide", label: "Pesticide", icon: "pest_control" },
  { id: "labour", label: "Labour", icon: "engineering" },
  { id: "transport", label: "Transport", icon: "local_shipping" },
  { id: "equipment", label: "Equipment", icon: "construction" },
  { id: "land_prep", label: "Land Prep", icon: "agriculture" },
  { id: "irrigation", label: "Irrigation", icon: "water_drop" },
  { id: "other", label: "Other", icon: "more_horiz" },
];

const incomeCategories = [
  { id: "crop_sales", label: "Crop Sales", icon: "sell" },
  { id: "by_product", label: "By-Product", icon: "recycling" },
  { id: "subsidies", label: "Subsidies", icon: "account_balance" },
  { id: "other", label: "Other", icon: "more_horiz" },
];

export default function AddRecordPage() {
  const [recordType, setRecordType] = useState<"expense" | "income">("expense");
  const categories = recordType === "expense" ? expenseCategories : incomeCategories;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-8">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/farm-records"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <h1 className="text-xl font-bold leading-tight">Add Record</h1>
        </div>
      </header>

      <div className="px-6 mt-4">
        {/* Type Toggle */}
        <div className="bg-white dark:bg-white/5 rounded-xl p-1 flex border border-slate-200 dark:border-white/10 mb-6 card">
          <button
            onClick={() => setRecordType("expense")}
            className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
              recordType === "expense"
                ? "bg-rose-500 text-white"
                : "text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
            Expense
          </button>
          <button
            onClick={() => setRecordType("income")}
            className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
              recordType === "income"
                ? "bg-primary text-background-dark"
                : "text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined text-lg">arrow_downward</span>
            Income
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Plot Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Farm Plot
            </label>
            <select className="w-full bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 text-sm font-medium appearance-none">
              <option>Plot A — Main Field (Maize)</option>
              <option>Plot B — Garden (Tomato)</option>
              <option>Plot C — Vlei (Groundnut)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="flex flex-col items-center gap-1 bg-white dark:bg-white/5 p-3 rounded-xl border-2 border-transparent chip-hover first:border-primary first:bg-primary/5"
                >
                  <span className="material-symbols-outlined text-lg text-slate-500">{cat.icon}</span>
                  <span className="text-[10px] font-bold uppercase">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Date
            </label>
            <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
              <span className="material-symbols-outlined text-slate-400 text-xl">calendar_today</span>
              <input
                type="date"
                defaultValue="2026-03-04"
                className="bg-transparent flex-1 text-sm font-medium outline-none"
              />
            </div>
          </div>

          {/* Amount + Currency */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Amount
              </label>
              <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 input-glow">
                <span className="text-slate-400 font-mono font-bold">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent flex-1 text-sm font-mono font-medium outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Currency
              </label>
              <select className="w-full bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 text-sm font-bold appearance-none">
                <option>USD</option>
                <option>ZiG</option>
              </select>
            </div>
          </div>

          {/* Quantity + Unit Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                <input
                  type="number"
                  placeholder="e.g. 50"
                  className="bg-transparent flex-1 text-sm font-mono font-medium outline-none placeholder:text-slate-400"
                />
                <span className="text-xs text-slate-400">kg</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Unit Price
              </label>
              <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
                <span className="text-slate-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent flex-1 text-sm font-mono font-medium outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Description / Notes */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add description or notes..."
              className="w-full bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10 text-sm outline-none resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Submit Button */}
          <button
            className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg mt-2 ${
              recordType === "expense"
                ? "bg-rose-500 text-white shadow-rose-500/30"
                : "bg-primary text-background-dark shadow-primary/30"
            }`}
          >
            <span className="material-symbols-outlined">save</span>
            Save {recordType === "expense" ? "Expense" : "Income"}
          </button>
        </div>
      </div>
    </div>
  );
}
