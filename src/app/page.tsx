/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "KuraVisor Home Dashboard",
};

export default function Home() {
  return (
    <div className="topo-pattern min-h-screen pb-24">
      {/* Header Section */}
      <header className="p-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border-2 border-primary overflow-hidden bg-primary/10">
            <img
              alt="Farmer profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASy6hbDq9waDrRWE5GabrOruHiKxoDJ8bgW3dNaEuMDlcZF8PCwDMAOR_5fXLVVIyjfMx_1SabtaWTmThwj-wEHMcsYJgWMCfT5fzNgC7WBYZkiAJOXY8a67URvaWi1OnMIl_cBzuFE4tw2_KwsTFjk3LjGRlXTHbI1RL8BUsbfnzS9TZJ4INN9wFwyEXicBCUXQQ-7NXKYRVvyjOEexotPSnuqGgrXxWADX7D3sihM96YpRExzZGSDh7Z7FM3oQ_fu5hgMiJg8F3k"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Smallholder ID: #4492</p>
            <h1 className="text-xl font-bold leading-tight">Musa&apos;s Acre</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="size-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn">
            <span className="material-symbols-outlined text-xl">satellite_alt</span>
          </button>
        </div>
      </header>

      {/* Sync Status Bar */}
      <section className="px-6 mb-6">
        <div className="bg-white/60 dark:bg-white/5 border border-primary/20 p-4 rounded-xl flex items-center justify-between card">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined text-primary text-2xl">cloud_off</span>
              <span className="absolute -top-1 -right-1 block size-2.5 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </div>
            <div>
              <p className="text-sm font-bold">Offline Mode Active</p>
              <p className="text-xs text-slate-500 font-mono italic">Last sync: 14:02 UTC</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono font-bold text-primary">100% READY</p>
            <div className="w-20 h-1 bg-slate-200 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-primary w-full shadow-[0_0_8px_rgba(19,236,19,0.6)]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Farm Stats */}
      <section className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Bio-Metrics</h2>
          <span className="text-primary font-mono text-xs font-bold px-2 py-1 bg-primary/10 rounded">LIVE DATA</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 card">
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-primary">water_drop</span>
              <span className="text-[10px] font-mono text-rose-500 font-bold">-2.4%</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-tighter">Soil Moisture</p>
            <p className="text-3xl font-mono font-bold">32.8<span className="text-sm font-normal">%</span></p>
          </div>
          <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 card">
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-primary">eco</span>
              <span className="text-[10px] font-mono text-primary font-bold">+5.1%</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-tighter">NDVI Health</p>
            <p className="text-3xl font-mono font-bold">0.82</p>
          </div>
          <div className="col-span-2 bg-primary dark:bg-primary/90 text-background-dark p-6 rounded-2xl relative overflow-hidden group glow">
            <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 transition-transform">
              <span className="material-symbols-outlined text-8xl">agriculture</span>
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Crop Status: Maize</p>
              <h3 className="text-2xl font-bold mb-4 italic font-mono">Vegetative V4</h3>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-70">Irrigation</p>
                  <p className="font-mono font-bold">Optimal</p>
                </div>
                <div className="w-px h-8 bg-background-dark/20"></div>
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-70">Est. Yield</p>
                  <p className="font-mono font-bold">4.2t/ha</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Priority Alerts</h2>
          <button className="text-primary text-xs font-bold flex items-center">VIEW LOG <span className="material-symbols-outlined text-sm ml-1">arrow_forward_ios</span></button>
        </div>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border-l-4 border-amber-400 items-center card">
            <div className="size-10 bg-amber-400/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Low Nitrogen detected in Plot B</p>
              <p className="text-xs text-slate-500">Manual inspection recommended within 48h</p>
            </div>
            <p className="text-[10px] font-mono text-slate-400">14m</p>
          </div>
          <div className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border-l-4 border-rose-500 items-center card">
            <div className="size-10 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">pest_control</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Fall Armyworm Risk High</p>
              <p className="text-xs text-slate-500">Weather conditions favor migration</p>
            </div>
            <p className="text-[10px] font-mono text-slate-400">2h</p>
          </div>
        </div>
      </section>

      {/* Farm Map Preview */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Plot Geometry</h2>
        </div>
        <div className="h-48 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-white/10 shadow-lg">
          <img
            alt="Farm aerial view"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGB9i5ZeH0pLHzPl1dS9Rka2sJpsTNcB_IHn_nAROSIn2cNGAlPitzBMN9QSQoaU0hU3kd7OqhdhxpfB2cFeVY7Tq_1FM8A41OuCsShXNeykmZ6gQrPpJLZk7c6g0Rw3LNNJvbTStzBVZaRXKB9Pbr8KXmwPd-pNHsenrsByMEuyobLcatCkuRj0-sv1gr-6gFbs134E6oEoLaU_cggmDkFjfaLJXyrL-rMNxqTcq1Rn7gZ4tN98HPpo8xjuy7I3VxlrVe0HyRSv4F"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 rounded-full bg-primary/30 flex items-center justify-center animate-pulse border border-primary/50">
              <div className="size-4 bg-primary rounded-full shadow-[0_0_15px_#13ec13]"></div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 bg-background-dark/90 text-white px-3 py-1.5 rounded-full text-[10px] font-mono flex items-center gap-2">
            <span className="size-1.5 bg-primary rounded-full"></span>
            GPS: -1.2921, 36.8219
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
