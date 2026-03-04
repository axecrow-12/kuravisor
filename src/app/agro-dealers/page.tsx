import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agro-Dealer Locator",
};

const dealers = [
  {
    id: "1",
    name: "FarmChem Agro Supplies",
    address: "Plot 24, Marondera Road, Mashonaland East",
    distance: "3.2 km",
    phone: "+263 77 891 2345",
    products: ["Fertilizers", "Pesticides", "Seeds"],
    open: true,
  },
  {
    id: "2",
    name: "Zimbabwe Fertilizer Company",
    address: "12 Main Street, Marondera",
    distance: "5.8 km",
    phone: "+263 71 456 7890",
    products: ["Compound D", "AN", "Urea"],
    open: true,
  },
  {
    id: "3",
    name: "Crop Seed International",
    address: "Harare-Mutare Highway, Ruwa",
    distance: "12.4 km",
    phone: "+263 78 234 5678",
    products: ["Hybrid Seeds", "Chemicals", "Equipment"],
    open: false,
  },
  {
    id: "4",
    name: "Windmill Agro",
    address: "7 Enterprise Road, Harare",
    distance: "18.6 km",
    phone: "+263 77 123 4567",
    products: ["Full Range"],
    open: true,
  },
  {
    id: "5",
    name: "Sable Chemicals",
    address: "31 Seke Road, Chitungwiza",
    distance: "22.1 km",
    phone: "+263 71 987 6543",
    products: ["AN Fertilizer", "Lime"],
    open: true,
  },
];

export default function AgroDealersPage() {
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
            <h1 className="text-xl font-bold leading-tight">Agro-Dealers</h1>
            <p className="text-xs text-slate-500">{dealers.length} shops nearby</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
          <span className="material-symbols-outlined text-sm">cloud_off</span>
          <span className="text-[10px] font-bold">CACHED</span>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-6 mt-4 mb-4">
        <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-3 border border-slate-200 dark:border-white/10 input-glow">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            type="text"
            placeholder="Search by name or location..."
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="px-6 mb-6">
        <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-white/10 relative overflow-hidden card">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-slate-400">map</span>
              <p className="text-xs text-slate-400 mt-2">Offline Map — Cached Region</p>
            </div>
          </div>
          {/* Map pins */}
          <div className="absolute top-8 left-12">
            <div className="size-6 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-background-dark text-xs">store</span>
            </div>
          </div>
          <div className="absolute top-16 right-20">
            <div className="size-6 bg-primary/70 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark text-xs">store</span>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/3">
            <div className="size-6 bg-primary/50 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark text-xs">store</span>
            </div>
          </div>
          {/* User location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="size-4 bg-blue-500 rounded-full border-2 border-white shadow animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Dealer List */}
      <section className="px-6 space-y-3">
        {dealers.map((dealer) => (
          <div
            key={dealer.id}
            className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{dealer.name}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      dealer.open
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500"
                    }`}
                  >
                    {dealer.open ? "OPEN" : "CLOSED"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{dealer.address}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-sm font-mono font-bold text-primary">{dealer.distance}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {dealer.products.map((product) => (
                <span
                  key={product}
                  className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full"
                >
                  {product}
                </span>
              ))}
            </div>
            <a
              href={`tel:${dealer.phone}`}
              className="flex items-center gap-2 text-primary text-xs font-bold"
            >
              <span className="material-symbols-outlined text-sm">phone</span>
              {dealer.phone}
            </a>
          </div>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}
