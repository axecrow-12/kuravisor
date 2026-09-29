"use client";

import Link from "next/link";
import { useMemo } from "react";
import BottomNav from "@/components/BottomNav";
import { Icon, SectionTitle } from "@/components/ui";
import { computeTotals, pick } from "@/lib/farm";
import { daysFromToday, formatMoney, greetingKey, initials, todayISO } from "@/lib/format";
import { useT } from "@/lib/i18n";
import { getCondition, localizeCondition, tipOfTheDay } from "@/lib/library";
import { actions, useAppState } from "@/lib/store";

export default function Home() {
  const { profile, plots, records, tasks, scans, settings } = useAppState();
  const { t, lang, crop, ago, relDay, longToday } = useT();
  const today = todayISO();

  const activePlots = useMemo(() => plots.filter((p) => p.status === "active"), [plots]);
  const activeIds = useMemo(() => new Set(activePlots.map((p) => p.id)), [activePlots]);
  const seasonProfit = useMemo(
    () => pick(computeTotals(records.filter((r) => activeIds.has(r.plotId))).profit, settings.currency),
    [records, activeIds, settings.currency],
  );
  const openTasks = useMemo(
    () => tasks.filter((task) => !task.done).sort((a, b) => a.date.localeCompare(b.date)),
    [tasks],
  );
  const dueCount = openTasks.filter((task) => task.date <= today).length;
  const lastScan = scans[0];
  const alertScan = scans.find((s) => s.matches.length > 0 && daysFromToday(s.createdAt) >= -14);
  const alertBase = alertScan && getCondition(alertScan.matches[0].id);
  const alertCondition = alertBase && localizeCondition(alertBase, lang);

  const setup = [
    { done: plots.length > 0, label: t("home.setupPlot"), href: "/farm-records/plots/new", icon: "add_location_alt" },
    { done: scans.length > 0, label: t("home.setupScan"), href: "/crop-doctor", icon: "photo_camera" },
    { done: tasks.length > 0, label: t("home.setupTask"), href: "/calendar", icon: "event" },
  ];
  const setupLeft = setup.filter((s) => !s.done).length;

  const tiles = [
    {
      href: "/farm-records",
      icon: "potted_plant",
      title: t("home.tileFarm"),
      stat: plots.length ? t("home.activePlots", { count: activePlots.length }) : t("home.addPlot"),
      bg: "from-emerald-600 to-green-900",
    },
    {
      href: "/crop-doctor",
      icon: "health_metrics",
      title: t("nav.cropDoctor"),
      stat: lastScan ? t("home.lastCheck", { when: ago(lastScan.createdAt) }) : t("home.checkPlant"),
      bg: "from-lime-600 to-emerald-800",
    },
    {
      href: "/farm-records",
      icon: "payments",
      title: t("home.tileMoney"),
      stat: records.length
        ? t("home.profit", { amount: formatMoney(seasonProfit, settings.currency) })
        : t("home.noRecords"),
      bg: "from-amber-500 to-orange-700",
    },
    {
      href: "/calendar",
      icon: "calendar_month",
      title: t("nav.tasks"),
      stat: dueCount
        ? t("home.dueNow", { count: dueCount })
        : openTasks.length
          ? t("home.upcoming", { count: openTasks.length })
          : t("home.nothingPlanned"),
      bg: "from-sky-600 to-indigo-800",
    },
  ];

  const firstName = profile?.name.split(/\s+/)[0] ?? "";

  return (
    <div className="relative flex min-h-dvh w-full flex-col pb-28">
      <header className="flex items-center gap-3 bg-background-light/85 dark:bg-background-dark/85 backdrop-blur-md sticky top-0 z-20 px-4 pt-5 pb-3">
        <Link
          href="/profile"
          aria-label={t("nav.profile")}
          className="size-11 shrink-0 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-brand"
        >
          {initials(profile?.name ?? "")}
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-xs truncate">
            {t(greetingKey())} · {longToday()}
          </p>
          <h1 className="text-lg font-bold leading-tight truncate">{firstName}</h1>
        </div>
        <Link
          href="/knowledge-base"
          aria-label={t("home.searchKb")}
          className="flex size-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-white/10 icon-btn"
        >
          <Icon name="search" />
        </Link>
        <Link
          href="/calendar"
          aria-label={dueCount ? t("home.dueNow", { count: dueCount }) : t("nav.tasks")}
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
                {alertCondition.name} · {crop(alertScan.crop)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t("home.found", { when: ago(alertScan.createdAt) })}
              </p>
            </div>
            <span className="px-3 py-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-full uppercase shrink-0">
              {t("common.view")}
            </span>
          </Link>
        )}

        {setupLeft > 0 && (
          <section className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">{t("home.getStarted")}</h2>
              <span className="text-xs font-bold text-slate-500">
                {t("home.stepsDone", { done: setup.length - setupLeft, total: setup.length })}
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
                <li key={s.href}>
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
          {tiles.map((tile) => (
            <Link
              key={tile.icon}
              href={tile.href}
              className={`group relative overflow-hidden rounded-2xl aspect-[5/4] p-4 flex flex-col justify-end bg-gradient-to-br ${tile.bg} text-white card-interactive`}
            >
              <div className="absolute inset-0 topo-pattern opacity-60" />
              <Icon
                name={tile.icon}
                className="absolute -top-2 -right-2 text-[88px] text-white/15 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative">
                <div className="size-9 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Icon name={tile.icon} className="text-xl" />
                </div>
                <p className="text-base font-bold leading-tight">{tile.title}</p>
                <p className="text-white/80 text-xs mt-0.5 truncate">{tile.stat}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="lightbulb" className="text-brand" filled />
            <h2 className="font-bold">{t("home.tipOfTheDay")}</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{tipOfTheDay(lang)}</p>
        </section>

        <section>
          <SectionTitle action={{ href: "/calendar", label: t("home.allTasks") }}>{t("home.comingUp")}</SectionTitle>
          {openTasks.length === 0 ? (
            <Link
              href="/calendar"
              className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 text-sm text-slate-500"
            >
              <Icon name="event_available" className="text-brand" />
              {t("home.noTasks")}
            </Link>
          ) : (
            <ul className="space-y-2">
              {openTasks.slice(0, 3).map((task) => {
                const overdue = task.date < today;
                return (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 card"
                  >
                    <button
                      type="button"
                      onClick={() => actions.toggleTask(task.id)}
                      aria-label={t("tasks.markDone", { title: task.title })}
                      className="size-8 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{task.title}</p>
                      {task.notes && <p className="text-xs text-slate-500 truncate">{task.notes}</p>}
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${overdue ? "text-rose-500" : "text-slate-500"}`}>
                      {relDay(task.date)}
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
            <span className="text-sm font-bold">{t("kb.title")}</span>
          </Link>
          <Link
            href="/agro-dealers"
            className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <Icon name="storefront" className="text-brand" />
            <span className="text-sm font-bold">{t("dealers.title")}</span>
          </Link>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
