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

  const stats = [
    {
      href: "/farm-records",
      label: t("money.profit"),
      value: formatMoney(seasonProfit, settings.currency),
      warn: seasonProfit < 0,
    },
    { href: "/calendar", label: t("home.statDue"), value: String(dueCount), warn: dueCount > 0 },
    { href: "/farm-records", label: t("home.statPlots"), value: String(activePlots.length), warn: false },
  ];

  const quickActions = [
    { href: "/farm-records/add", icon: "post_add", label: t("farm.addRecord"), tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" },
    { href: "/calendar", icon: "add_task", label: t("tasks.add"), tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400" },
    { href: "/knowledge-base", icon: "menu_book", label: t("kb.title"), tone: "bg-primary/10 text-brand" },
    { href: "/agro-dealers", icon: "storefront", label: t("dealers.title"), tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400" },
  ];

  const firstName = profile?.name.split(/\s+/)[0] ?? "";

  return (
    <div className="relative flex min-h-dvh w-full flex-col pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-emerald-800 to-emerald-950 text-white px-4 pt-5 pb-14 rounded-b-3xl">
        <div className="absolute inset-0 topo-pattern-light" aria-hidden />
        <Icon name="eco" className="absolute -right-6 -top-4 text-[140px] text-white/5" />

        <div className="relative flex items-center gap-3">
          <Link
            href="/profile"
            aria-label={t("nav.profile")}
            className="size-11 shrink-0 rounded-full bg-white/15 ring-2 ring-white/30 flex items-center justify-center font-bold"
          >
            {initials(profile?.name ?? "")}
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-white/75 text-xs truncate">
              {t(greetingKey())} · {longToday()}
            </p>
            <h1 className="text-xl font-bold leading-tight truncate">{firstName}</h1>
          </div>
          <Link
            href="/knowledge-base"
            aria-label={t("home.searchKb")}
            className="flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <Icon name="search" />
          </Link>
          <Link
            href="/calendar"
            aria-label={dueCount ? t("home.dueNow", { count: dueCount }) : t("nav.tasks")}
            className="relative flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <Icon name="notifications" />
            {dueCount > 0 && (
              <span className="absolute top-2 right-2 size-2.5 bg-rose-500 rounded-full ring-2 ring-emerald-800" />
            )}
          </Link>
        </div>

        <div className="relative grid grid-cols-3 gap-2 mt-5">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex flex-col justify-between gap-1 rounded-2xl bg-white/12 hover:bg-white/20 backdrop-blur-sm px-3 py-2.5 transition-colors"
            >
              <p className="text-xs font-semibold leading-tight text-white/75 line-clamp-2">{s.label}</p>
              <p className={`text-xl font-bold leading-tight truncate ${s.warn ? "text-amber-300" : ""}`}>{s.value}</p>
            </Link>
          ))}
        </div>
      </header>

      <main className="px-4 -mt-9 relative space-y-6">
        <Link
          href="/crop-doctor"
          className="flex items-center gap-4 p-4 bg-white dark:bg-[#15291d] rounded-2xl border border-slate-100 dark:border-white/10 shadow-lg card-interactive"
        >
          <div className="size-14 shrink-0 rounded-2xl bg-primary text-on-primary flex items-center justify-center btn-glow">
            <Icon name="photo_camera" className="text-3xl" filled />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">{t("home.checkPlant")}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lastScan ? t("home.lastCheck", { when: ago(lastScan.createdAt) }) : t("home.checkPlantHint")}
            </p>
          </div>
          <Icon name="arrow_forward" className="text-brand" />
        </Link>

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
            <ul className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5 card">
              {openTasks.slice(0, 3).map((task) => {
                const overdue = task.date < today;
                return (
                  <li key={task.id} className="flex items-center gap-3 p-3.5">
                    <button
                      type="button"
                      onClick={() => actions.toggleTask(task.id)}
                      aria-label={t("tasks.markDone", { title: task.title })}
                      className="size-7 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{task.title}</p>
                      {task.notes && <p className="text-xs text-slate-500 truncate">{task.notes}</p>}
                    </div>
                    <span
                      className={`text-[11px] font-bold shrink-0 px-2 py-1 rounded-full ${
                        overdue
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400"
                          : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      {relDay(task.date)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section>
          <SectionTitle>{t("home.quickActions")}</SectionTitle>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((a) => (
              <Link
                key={a.href + a.icon}
                href={a.href}
                className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors"
              >
                <span className={`size-14 rounded-2xl flex items-center justify-center ${a.tone}`}>
                  <Icon name={a.icon} className="text-2xl" />
                </span>
                <span className="text-[11px] font-bold text-center leading-tight text-slate-700 dark:text-slate-300">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl p-4 bg-amber-50 border border-amber-200/70 dark:bg-amber-500/10 dark:border-amber-500/20">
          <Icon name="lightbulb" className="absolute -right-3 -bottom-4 text-[96px] text-amber-400/15" filled />
          <div className="relative flex items-center gap-2 mb-2">
            <span className="size-8 rounded-full bg-amber-400/25 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Icon name="lightbulb" className="text-lg" filled />
            </span>
            <h2 className="font-bold">{t("home.tipOfTheDay")}</h2>
          </div>
          <p className="relative text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{tipOfTheDay(lang)}</p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
