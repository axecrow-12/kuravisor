/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Crop Doctor AI Scanner",
};

export default function CropDoctor() {
  return (
    <div className="overflow-hidden">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center bg-white/70 dark:bg-black/40 backdrop-blur-md p-4 pb-4 pt-12 justify-between border-b border-primary/10">
          <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center bg-white/50 dark:bg-black/20 rounded-full icon-btn">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Crop Doctor AI</h2>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-slate-300">Live Viewfinder</span>
            </div>
          </div>
          <div className="flex size-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary icon-btn">
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </div>
        </div>

        {/* Viewfinder Area */}
        <div className="relative flex-1 bg-slate-200 dark:bg-slate-900 overflow-hidden">
          {/* Simulated Camera Feed Image */}
          <img
            alt="Healthy green crop leaves"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT"
          />

          {/* Tech Overlays */}
          <div className="absolute inset-0 scanner-grid opacity-60"></div>
          <div className="absolute inset-x-0 scan-line"></div>

          {/* Bounding Box */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64 border-2 border-primary/40 rounded-lg">
              {/* Corners */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-md"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-md"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-md"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-md"></div>

              {/* Identification Label */}
              <div className="absolute -top-10 left-0 bg-primary px-3 py-1 rounded-full flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">IDENTIFYING...</span>
                <span className="text-[10px] bg-white/30 px-1 rounded">89%</span>
              </div>
            </div>
          </div>

          {/* Offline Status Badge */}
          <div className="absolute top-32 left-4 right-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-sm">cloud_off</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Offline Mode Active</p>
                  <p className="text-slate-300 text-[10px]">Processing on-device</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-primary text-[10px] font-bold">75% AI Loaded</span>
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-background-dark px-6 pt-8 pb-10 rounded-t-lg shadow-2xl z-20">
          <div className="flex flex-col items-center gap-6">
            {/* Feedback Text */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Scanning Crop...</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Keep the camera steady for 2 seconds</p>
            </div>

            {/* Main Action Row */}
            <div className="flex items-center justify-center gap-10 w-full">
              <button className="flex flex-col items-center gap-2 group">
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 icon-btn">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Gallery</span>
              </button>

              <button className="relative flex size-24 items-center justify-center rounded-full bg-primary/20 p-2 border-2 border-primary/50 glow">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-slate-900 btn-glow">
                  <span className="material-symbols-outlined text-4xl">center_focus_strong</span>
                </div>
              </button>

              <button className="flex flex-col items-center gap-2 group">
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 icon-btn">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-400">History</span>
              </button>
            </div>

            {/* Analyze Offline Button */}
            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-3 card">
              <span className="material-symbols-outlined">psychology</span>
              Analyze Offline
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
