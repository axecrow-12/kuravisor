"use client";

import Link from "next/link";
import { useMemo } from "react";
import BottomNav from "@/components/BottomNav";
import { Icon, SectionTitle } from "@/components/ui";
import { computeTotals, pick } from "@/lib/farm";
import { daysFromToday, formatMoney, greeting, initials, relativeDay, timeAgo, todayISO } from "@/lib/format";
import { cropLabel, getCondition, tipOfTheDay } from "@/lib/library";
import { actions, useAppState } from "@/lib/store";

export default function Home() {
  const { profile, plots, records, tasks, scans, settings } = useAppState();
  const today = todayISO();

  const activePlots = useMemo(() => plots.filter((p) => p.status === "active"), [plots]);
  const activeIds = useMemo(() => new Set(activePlots.map((p) => p.id)), [activePlots]);
  const seasonProfit = useMemo(
    () => pick(computeTotals(records.filter((r) => activeIds.has(r.plotId))).profit, settings.currency),
    [records, activeIds, settings.currency],
  );
  const openTasks = useMemo(
    () => tasks.filter((t) => !t.done).sort((a, b) => a.date.localeCompare(b.date)),
    [tasks],
  );
  const dueCount = openTasks.filter((t) => t.date <= today).length;
  const lastScan = scans[0];
  const alertScan = scans.find(
    (s) => s.matches.length > 0 && daysFromToday(s.createdAt) >= -14,
  );
  const alertCondition = alertScan && getCondition(alertScan.matches[0].id);

  const setup = [
    { done: plots.length > 0, label: "Add your first plot", href: "/farm-records/plots/new", icon: "add_location_alt" },
    { done: scans.length > 0, label: "Check a plant with Crop Doctor", href: "/crop-doctor", icon: "photo_camera" },
    { done: tasks.length > 0, label: "Plan a farm task", href: "/calendar", icon: "event" },
  ];
  const setupLeft = setup.filter((s) => !s.done).length;

  const tiles = [
    {
      href: "/farm-records",
      icon: "potted_plant",
      title: "My Farm",
      stat: plots.length ? `${activePlots.length} active plot${activePlots.length === 1 ? "" : "s"}` : "Add a plot",
      bg: "from-emerald-600 to-green-900",
    },
    {
      href: "/crop-doctor",
      icon: "health_metrics",
      title: "Crop Doctor",
      stat: lastScan ? `Last check ${timeAgo(lastScan.createdAt)}` : "Check a plant",
      bg: "from-lime-600 to-emerald-800",
    },
    {
      href: "/farm-records",
      icon: "payments",
      title: "Money",
      stat: records.length ? `Profit ${formatMoney(seasonProfit, settings.currency)}` : "No records yet",
      bg: "from-amber-500 to-orange-700",
    },
    {
      href: "/calendar",
      icon: "calendar_month",
      title: "Tasks",
      stat: dueCount ? `${dueCount} due now` : openTasks.length ? `${openTasks.length} upcoming` : "Nothing planned",
      bg: "from-sky-600 to-indigo-800",
    },
  ];

  const firstName = profile?.name.split(/\s+/)[0] ?? "";

  return (
    <div className="relative flex min-h-dvh w-full flex-col pb-28">
      <header className="flex items-center gap-3 bg-background-light/85 dark:bg-background-dark/85 backdrop-blur-md sticky top-0 z-20 px-4 pt-5 pb-3">
        <Link
          href="/profile"
          aria-label="Profile"
          className="size-11 shrink-0 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-brand"
        >
          {initials(profile?.name ?? "")}
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-xs truncate">
            {greeting()} · {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="text-lg font-bold leading-tight truncate">{firstName}</h1>
        </div>
        <Link
          href="/knowledge-base"
          aria-label="Search the knowledge base"
          className="flex size-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-white/10 icon-btn"
        >
          <Icon name="search" />
        </Link>
        <Link
          href="/calendar"
          aria-label={dueCount ? `${dueCount} tasks due` : "Tasks"}
          className="relative flex size-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-white/10 icon-btn"
        >
          <Icon name="notifications" />
          {dueCount > 0 && (
            <span className="absolute top-2 right-2 size-2.5 bg-rose-500 rounded-full border-2 border-background-light dark:border-background-dark" />
          )}
        </Link>
      </header>

      <main className="px-4 pt-2 space-y-7">
        {alertScan && alertCondition && (
          <Link
            href={`/crop-doctor/results/${alertScan.id}`}
            className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-200 dark:border-rose-500/25 card-interactive"
          >
            <div className="size-11 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <Icon name="warning" filled />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">
                {alertCondition.name} on {cropLabel(alertScan.crop)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Found {timeAgo(alertScan.createdAt)} · {alertCondition.urgency}
              </p>
            </div>
            <span className="px-3 py-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-full uppercase shrink-0">
              View
            </span>
          </Link>
        )}

        {setupLeft > 0 && (
          <section className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">Get started</h2>
              <span className="text-xs font-bold text-slate-500">
                {setup.length - setupLeft} of {setup.length} done
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-white/10 rounded-full mb-3 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((setup.length - setupLeft) / setup.length) * 100}%` }}
              />
            </div>
            <ul className="space-y-1">
              {setup.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className={`flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-primary/5 ${s.done ? "opacity-60" : ""}`}
                  >
                    <Icon
                      name={s.done ? "check_circle" : s.icon}
                      filled={s.done}
                      className={s.done ? "text-brand" : "text-slate-500"}
                    />
                    <span className={`flex-1 text-sm font-medium ${s.done ? "line-through" : ""}`}>{s.label}</span>
                    {!s.done && <Icon name="chevron_right" className="text-slate-400" />}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className={`group relative overflow-hidden rounded-2xl aspect-[5/4] p-4 flex flex-col justify-end bg-gradient-to-br ${t.bg} text-white card-interactive`}
            >
              <div className="absolute inset-0 topo-pattern opacity-60" />
              <Icon
                name={t.icon}
                className="absolute -top-2 -right-2 text-[88px] text-white/15 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative">
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Icon name={t.icon} className="text-xl" />
                </div>
                <p className="text-base font-bold leading-tight">{t.title}</p>
                <p className="text-white/80 text-xs mt-0.5 truncate">{t.stat}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="lightbulb" className="text-brand" filled />
            <h2 className="font-bold">Tip of the Day</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{tipOfTheDay()}</p>
        </section>

        <section>
          <SectionTitle action={{ href: "/calendar", label: "All tasks" }}>Coming up</SectionTitle>
          {openTasks.length === 0 ? (
            <Link
              href="/calendar"
              className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 text-sm text-slate-500"
            >
              <Icon name="event_available" className="text-brand" />
              No tasks planned. Tap to add one.
            </Link>
          ) : (
            <ul className="space-y-2">
              {openTasks.slice(0, 3).map((t) => {
                const overdue = t.date < today;
                return (
                  <li
                    key={t.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 card"
                  >
                    <button
                      type="button"
                      onClick={() => actions.toggleTask(t.id)}
                      aria-label={`Mark "${t.title}" done`}
                      className="size-8 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{t.title}</p>
                      {t.notes && <p className="text-xs text-slate-500 truncate">{t.notes}</p>}
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${overdue ? "text-rose-500" : "text-slate-500"}`}>
                      {relativeDay(t.date)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Link
            href="/knowledge-base"
            className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <Icon name="menu_book" className="text-brand" />
            <span className="text-sm font-bold">Knowledge Base</span>
          </Link>
          <Link
            href="/agro-dealers"
            className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <Icon name="storefront" className="text-brand" />
            <span className="text-sm font-bold">Agro-Dealers</span>
          </Link>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
