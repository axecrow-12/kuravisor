"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { todayISO } from "@/lib/format";
import { useT, type MessageKey } from "@/lib/i18n";
import { useAppState } from "@/lib/store";
import { Icon } from "./ui";

const navItems: { href: string; icon: string; label: MessageKey; isFab?: boolean }[] = [
  { href: "/", icon: "home", label: "nav.home" },
  { href: "/farm-records", icon: "eco", label: "nav.farm" },
  { href: "/crop-doctor", icon: "photo_camera", label: "nav.cropDoctor", isFab: true },
  { href: "/calendar", icon: "task_alt", label: "nav.tasks" },
  { href: "/profile", icon: "person", label: "nav.profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { tasks } = useAppState();
  const { t } = useT();
  const dueCount = useMemo(() => {
    const today = todayISO();
    return tasks.filter((t) => !t.done && t.date <= today).length;
  }, [tasks]);

  return (
    <nav aria-label={t("nav.main")} className="fixed bottom-0 left-0 right-0 max-w-screen-sm mx-auto z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-4 mb-4 bg-white/90 dark:bg-[#12241a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={t(item.label)}
                className="flex items-center justify-center bg-primary text-on-primary size-14 rounded-full -translate-y-4 shadow-lg border-4 border-background-light dark:border-background-dark btn-glow"
              >
                <Icon name={item.icon} className="text-[28px]" filled />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive ? "text-brand bg-primary/10" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <Icon name={item.icon} className="text-[26px]" filled={isActive} />
              <span className="text-[11px] font-bold uppercase tracking-tight">{t(item.label)}</span>
              {item.href === "/calendar" && dueCount > 0 && (
                <span className="absolute top-0.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold leading-4 text-center">
                  {dueCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
