"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "grid_view", label: "Home" },
  { href: "/crop-doctor", icon: "document_scanner", label: "Scan" },
  { href: "/farm-records", icon: "inventory_2", label: "Records" },
  { href: "/calendar", icon: "calendar_month", label: "Calendar" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md h-16 glass-nav border border-white/40 dark:border-white/10 rounded-full flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center size-12 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-primary text-background-dark glow"
                : "text-slate-500 icon-btn"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${
                isActive ? "fill-1" : ""
              }`}
            >
              {item.icon}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
