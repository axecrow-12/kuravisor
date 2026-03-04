export default function SyncStatusBadge() {
  return (
    <div className="bg-white/60 dark:bg-white/5 border border-primary/20 p-3 rounded-xl flex items-center justify-between card">
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="material-symbols-outlined text-primary text-xl">cloud_off</span>
          <span className="absolute -top-1 -right-1 block size-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
        </div>
        <div>
          <p className="text-xs font-bold">Offline Mode</p>
          <p className="text-[10px] text-slate-500 font-mono italic">Last sync: 14:02 UTC</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-mono font-bold text-primary">100% READY</p>
        <div className="w-16 h-1 bg-slate-200 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-primary w-full shadow-[0_0_8px_rgba(19,236,19,0.6)]"></div>
        </div>
      </div>
    </div>
  );
}
