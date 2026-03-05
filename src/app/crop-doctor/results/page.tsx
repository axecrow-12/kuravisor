/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan Results",
};

export default function DiagnosisResultsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-8">
      {/* Header */}
      <header className="p-6 pt-8 flex items-center gap-3">
        <Link
          href="/crop-doctor"
          className="flex size-12 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold">Scan Results</h1>
          <p className="text-base text-slate-500">04 March 2026</p>
        </div>
      </header>

      {/* Photo */}
      <section className="px-6 mt-2 mb-6">
        <div className="h-48 rounded-2xl overflow-hidden relative border-2 border-slate-200 dark:border-white/10">
          <img
            alt="Scanned crop"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT"
          />
          <div className="absolute top-3 left-3 bg-primary px-4 py-1.5 rounded-full">
            <span className="text-base font-bold text-background-dark">Maize</span>
          </div>
        </div>
      </section>

      {/* Problem Found */}
      <section className="px-6 mb-6">
        <div className="bg-red-50 dark:bg-red-500/10 p-6 rounded-2xl border-2 border-red-200 dark:border-red-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-12 bg-red-100 dark:bg-red-500/20 text-red-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">bug_report</span>
            </div>
            <div>
              <p className="text-base text-red-600 font-bold">Problem Found</p>
              <h3 className="text-xl font-extrabold">Fall Armyworm</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">Serious</span>
            <span className="bg-red-100 dark:bg-red-500/20 text-red-600 text-sm font-bold px-3 py-1 rounded-full">Pest / Bug</span>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="px-6 mb-6">
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border-2 border-slate-100 dark:border-white/10">
          <h3 className="text-lg font-extrabold mb-3">What is this?</h3>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Fall Armyworm is a harmful caterpillar that eats maize leaves and ears.
            If you don&apos;t treat it quickly, it can destroy most of your crop.
            Look for small holes in the leaves and tiny worms inside.
          </p>
        </div>
      </section>

      {/* What to do */}
      <section className="px-6 mb-6">
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border-2 border-slate-100 dark:border-white/10">
          <h3 className="text-lg font-extrabold mb-3">What should I do?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl mt-0.5">looks_one</span>
              <p className="text-base">Pick off the worms you can see by hand</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl mt-0.5">looks_two</span>
              <p className="text-base">Spray with pesticide as soon as possible</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl mt-0.5">looks_3</span>
              <p className="text-base">Check your crops again in 3 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-6 space-y-3">
        <Link
          href="/agro-dealers"
          className="w-full bg-primary text-background-dark font-extrabold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg btn-glow"
        >
          <span className="material-symbols-outlined text-2xl">store</span>
          Find a Nearby Shop
        </Link>
        <Link
          href="/crop-doctor"
          className="w-full bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg border-2 border-slate-200 dark:border-white/10"
        >
          <span className="material-symbols-outlined text-2xl">photo_camera</span>
          Scan Another Plant
        </Link>
      </section>
    </div>
  );
}
