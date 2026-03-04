import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatment Details",
};

export default function TreatmentDetailsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-8">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/crop-doctor/results"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Treatment Plan</h1>
            <p className="text-xs text-slate-500">Fall Armyworm — Maize</p>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-primary/20 text-primary icon-btn">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </button>
      </header>

      {/* Severity Banner */}
      <section className="px-6 mt-4 mb-6">
        <div className="bg-rose-500 text-white p-4 rounded-2xl flex items-center gap-3 card">
          <div className="size-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">priority_high</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Severity: High</p>
            <p className="text-sm font-bold">Treat within 24–48 hours to prevent yield loss</p>
          </div>
        </div>
      </section>

      {/* Chemical Treatment */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">science</span>
          Chemical Treatment
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Recommended Product</p>
              <p className="text-sm font-bold">Emamectin Benzoate 5% SG</p>
              <p className="text-xs text-slate-500 mt-1">Brand: Belt® Expert, Ampligo®</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Dosage</p>
                <p className="text-sm font-bold font-mono">200–250 ml/ha</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Application</p>
                <p className="text-sm font-bold">Foliar Spray</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Frequency</p>
                <p className="text-sm font-bold">Every 7–10 days</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Water Volume</p>
                <p className="text-sm font-bold font-mono">200 L/ha</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-500/10 p-4 border-t border-amber-200 dark:border-amber-500/20">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">warning</span>
              <div>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Safety Precautions</p>
                <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                  Wear protective gloves, mask, and long sleeves. Do not spray in windy conditions. Keep away from water sources. Observe a 14-day pre-harvest interval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Treatment */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">eco</span>
          Organic / Traditional Treatment
        </h2>
        <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-4 card">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Method 1</p>
            <p className="text-sm font-bold">Neem Oil Extract</p>
            <p className="text-xs text-slate-500 mt-1">
              Mix 30 ml neem oil with 10 L water and 5 ml liquid soap. Spray on affected plants weekly.
            </p>
          </div>
          <div className="w-full h-px bg-slate-100 dark:bg-white/10"></div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Method 2</p>
            <p className="text-sm font-bold">Ash + Sand Application</p>
            <p className="text-xs text-slate-500 mt-1">
              Apply a mixture of fine wood ash and sand directly into the maize whorl to kill early-stage larvae.
            </p>
          </div>
          <div className="w-full h-px bg-slate-100 dark:bg-white/10"></div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Method 3</p>
            <p className="text-sm font-bold">Handpicking</p>
            <p className="text-xs text-slate-500 mt-1">
              For small plots, manually remove and destroy larvae found in the whorl of maize plants. Best done early morning.
            </p>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="px-6 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">shield</span>
          Prevention Measures
        </h2>
        <div className="space-y-2">
          {[
            { icon: "rotate_right", text: "Practice crop rotation with non-host crops (legumes)" },
            { icon: "calendar_month", text: "Plant early in the season — early-planted crops are less affected" },
            { icon: "search", text: "Scout fields weekly during vegetative stage for early detection" },
            { icon: "grass", text: "Keep fields weed-free — weeds harbour armyworm eggs" },
            { icon: "pets", text: "Encourage natural predators (birds, parasitic wasps, ground beetles)" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card"
            >
              <span className="material-symbols-outlined text-primary text-lg mt-0.5">{item.icon}</span>
              <p className="text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-6 space-y-3">
        <Link
          href="/agro-dealers"
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <span className="material-symbols-outlined">store</span>
          Find Nearest Agro-Dealer
        </Link>
        <Link
          href="/scan-history"
          className="w-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 card"
        >
          <span className="material-symbols-outlined">history</span>
          View Scan History
        </Link>
      </section>
    </div>
  );
}
