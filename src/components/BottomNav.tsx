"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/crop-doctor", icon: "local_hospital", label: "Doctor" },
  { href: "/reports", icon: "payments", label: "Money" },
  { href: "/calendar", icon: "calendar_month", label: "Calendar" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t-2 border-slate-200 dark:border-white/10 flex items-center justify-around px-2 py-2 z-50">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "text-primary"
                : "text-slate-400"
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                isActive ? "fill-1" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-slate-400"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
