"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/farm-records", icon: "eco", label: "Crops" },
  { href: "/crop-doctor", icon: "photo_camera", label: "", isFab: true },
  { href: "/calendar", icon: "inventory", label: "Tasks" },
  { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-screen-sm mx-auto z-30">
      <div className="mx-4 mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center bg-primary text-white size-12 rounded-full -translate-y-4 shadow-lg border-4 border-background-light dark:border-background-dark"
              >
                <span className="material-symbols-outlined text-[30px]">photo_camera</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 ${
                isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[26px] ${
                  isActive ? "fill-1" : ""
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
