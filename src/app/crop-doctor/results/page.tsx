/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnosis Results",
};

export default function DiagnosisResultsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-8">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/crop-doctor"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Scan Results</h1>
            <p className="text-xs text-slate-500 font-mono">04 Mar 2026, 14:32 UTC</p>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
          <span className="material-symbols-outlined text-xl">bookmark_border</span>
        </button>
      </header>

      {/* Scanned Image Preview */}
      <section className="px-6 mt-4 mb-6">
        <div className="h-48 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-white/10 card">
          <img
            alt="Scanned crop"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT"
          />
          <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-background-dark">Maize</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-background-dark/80 text-white px-3 py-1 rounded-full text-[10px] font-mono">
            GPS: -1.2921, 36.8219
          </div>
        </div>
      </section>

      {/* Primary Diagnosis */}
      <section className="px-6 mb-6">
        <div className="bg-rose-50 dark:bg-rose-500/10 p-5 rounded-2xl border border-rose-200 dark:border-rose-500/20 card">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="size-10 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">bug_report</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Primary Diagnosis</p>
                <h3 className="text-lg font-bold">Fall Armyworm</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold text-rose-500">92%</p>
              <p className="text-[10px] text-slate-500">Confidence</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-rose-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">High Severity</span>
            <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase px-2 py-1 rounded-full">Pest</span>
          </div>
        </div>
      </section>

      {/* Other Possibilities */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Other Possibilities</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card">
            <div className="size-10 bg-amber-400/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">coronavirus</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Northern Leaf Blight</p>
              <p className="text-xs text-slate-500">Fungal Disease</p>
            </div>
            <p className="text-lg font-mono font-bold text-amber-500">5%</p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card">
            <div className="size-10 bg-blue-400/10 text-blue-500 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">science</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Nitrogen Deficiency</p>
              <p className="text-xs text-slate-500">Nutrient</p>
            </div>
            <p className="text-lg font-mono font-bold text-blue-500">3%</p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="px-6 mb-6">
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 card">
          <h3 className="text-sm font-bold mb-3">About Fall Armyworm</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Fall Armyworm (<em>Spodoptera frugiperda</em>) is a highly destructive pest that primarily attacks maize crops.
            Larvae feed on leaves, tassels, and developing ears, causing significant yield losses of up to 70% if untreated.
            Early detection and prompt treatment are critical.
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-6 space-y-3">
        <Link
          href="/treatments/fall-armyworm"
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <span className="material-symbols-outlined">medication</span>
          View Treatment Plan
        </Link>
        <Link
          href="/agro-dealers"
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 card"
        >
          <span className="material-symbols-outlined">store</span>
          Find Nearest Agro-Dealer
        </Link>
        <Link
          href="/crop-doctor"
          className="w-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 card"
        >
          <span className="material-symbols-outlined">center_focus_strong</span>
          Scan Again
        </Link>
      </section>
    </div>
  );
}
