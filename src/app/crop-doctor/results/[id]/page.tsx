"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { Card, EmptyState, Icon, LibraryNotice } from "@/components/ui";
import { todayISO } from "@/lib/format";
import { useLibrary, useT } from "@/lib/i18n";
import { actions, useAppState } from "@/lib/store";

const SEVERITY_STYLE = {
  high: { card: "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/25", icon: "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400", chip: "bg-rose-600 text-white" },
  medium: { card: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/25", icon: "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400", chip: "bg-amber-500 text-white" },
  low: { card: "bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/25", icon: "bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400", chip: "bg-sky-600 text-white" },
};

export default function ScanResultsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { scans, plots } = useAppState();
  const { t, crop, date } = useT();
  const lib = useLibrary();
  const scan = scans.find((s) => s.id === id);
  const [reminded, setReminded] = useState(false);

  if (!scan) {
    return (
      <div className="min-h-dvh pb-28">
        <PageHeader title={t("results.title")} backHref="/crop-doctor" />
        <div className="px-4 mt-6">
          <EmptyState
            icon="search_off"
            title={t("results.notFound")}
            text={t("common.mayBeDeleted")}
            action={{ href: "/crop-doctor", label: t("results.newCheck"), icon: "photo_camera" }}
          />
        </div>
        <BottomNav />
      </div>
    );
  }

  const healthy = scan.symptoms.length === 0;
  const top = scan.matches[0] ? lib.conditionById(scan.matches[0].id) : undefined;
  const others = scan.matches.slice(1).flatMap((m) => {
    const c = lib.conditionById(m.id);
    return c ? [{ condition: c, score: m.score }] : [];
  });
  const plot = plots.find((p) => p.id === scan.plotId);

  const cropName = crop(scan.crop);

  function remind(days: number, title: string) {
    actions.addTask({
      title,
      notes: `${cropName}${plot ? ` · ${plot.name}` : ""}`,
      date: todayISO(days),
      kind: "inspect",
      plotId: scan!.plotId,
    });
    setReminded(true);
  }

  const reminderButton = (days: number, title: string) => (
    <button
      type="button"
      disabled={reminded}
      onClick={() => remind(days, title)}
      className="w-full bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:border-primary disabled:text-brand"
    >
      <Icon name={reminded ? "event_available" : "alarm_add"} />
      {reminded ? t("results.reminderAdded") : t("results.remindIn", { count: days })}
    </button>
  );

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={t("results.title")}
        subtitle={`${cropName}${plot ? ` · ${plot.name}` : ""} · ${date(scan.createdAt)}`}
        backHref="/crop-doctor"
      />

      {scan.image && (
        <section className="px-4 mt-4">
          <div className="h-52 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-white/10">
            <img alt={t("results.scannedPlant")} className="w-full h-full object-cover" src={scan.image} />
            <span className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full text-sm font-bold text-background-dark">
              {cropName}
            </span>
          </div>
        </section>
      )}

      <div className="px-4 mt-4 space-y-4">
        {healthy ? (
          <>
            <div className="p-5 rounded-2xl border-2 bg-primary/10 border-primary/30">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-primary/20 text-brand rounded-full flex items-center justify-center">
                  <Icon name="check_circle" className="text-3xl" filled />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand">{t("results.noProblems")}</p>
                  <h2 className="text-xl font-bold">{t("results.looksHealthy")}</h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                {t("results.healthyText")}
              </p>
            </div>
            {reminderButton(7, t("results.taskScout", { crop: cropName }))}
          </>
        ) : !top ? (
          <>
            <div className="p-5 rounded-2xl border-2 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 bg-slate-200 dark:bg-white/10 text-slate-500 rounded-full flex items-center justify-center">
                  <Icon name="help" className="text-3xl" />
                </div>
                <h2 className="text-xl font-bold">{t("scan.noMatch")}</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("results.noMatchText", { crop: cropName })}
              </p>
            </div>
            {reminderButton(3, t("results.taskRecheck", { crop: cropName }))}
          </>
        ) : (
          <>
            <div className={`p-5 rounded-2xl border-2 ${SEVERITY_STYLE[top.severity].card}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${SEVERITY_STYLE[top.severity].icon}`}>
                  <Icon name={top.type === "pest" ? "bug_report" : top.type === "disease" ? "coronavirus" : "science"} className="text-3xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{t("results.mostLikely")}</p>
                  <h2 className="text-xl font-bold leading-tight">{top.name}</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${SEVERITY_STYLE[top.severity].chip}`}>
                  {t(`severity.${top.severity}`)}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 dark:bg-white/10">
                  {t(`type.${top.type}`)}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 dark:bg-white/10">
                  {t("results.signMatch", { pct: Math.round(scan.matches[0].score * 100) })}
                </span>
              </div>
              <p className="text-sm font-bold mt-3 flex items-center gap-1.5">
                <Icon name="schedule" className="text-lg" />
                {top.urgency}
              </p>
            </div>

            <LibraryNotice lib={lib} className="" />

            <Card className="p-5">
              <h3 className="text-lg font-bold mb-2">{t("results.whatIsThis")}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{top.summary}</p>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-bold mb-3">{t("results.whatToDo")}</h3>
              <ol className="space-y-3">
                {top.firstSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="size-6 rounded-full bg-primary text-background-dark text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <div className="space-y-2">
              <Link
                href={`/treatments/${top.id}`}
                className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
              >
                <Icon name="medication" />
                {t("results.fullPlan")}
              </Link>
              {reminderButton(3, t("results.taskRecheckFor", { crop: cropName, problem: top.name }))}
              <Link
                href="/agro-dealers"
                className="w-full bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
              >
                <Icon name="storefront" />
                {t("results.findDealer")}
              </Link>
            </div>

            {others.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 mt-2">
                  {t("results.couldAlsoBe")}
                </h3>
                <div className="space-y-2">
                  {others.map(({ condition, score }) => (
                    <Link
                      key={condition.id}
                      href={`/knowledge-base/${condition.id}`}
                      className="flex items-center gap-3 p-3.5 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 card-interactive"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{condition.name}</p>
                        <p className="text-xs text-slate-500">{t(`type.${condition.type}`)}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{Math.round(score * 100)}%</span>
                      <Icon name="chevron_right" className="text-slate-400" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {scan.symptoms.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 mt-2">{t("results.signsReported")}</h3>
            <div className="flex flex-wrap gap-2">
              {scan.symptoms.map((s) => (
                <span key={s} className="text-xs bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full">
                  {lib.symptom(s)}
                </span>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-slate-500 flex items-start gap-2 bg-slate-100 dark:bg-white/5 rounded-xl p-3">
          <Icon name="info" className="text-base" />
          {t("results.disclaimer")}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/crop-doctor"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Icon name="photo_camera" />
            {t("results.newCheck")}
          </Link>
          <button
            type="button"
            onClick={() => {
              if (!confirm(t("results.confirmDelete"))) return;
              actions.deleteScan(scan.id);
              router.replace("/scan-history");
            }}
            className="text-rose-600 dark:text-rose-400 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 border-2 border-rose-200 dark:border-rose-500/20"
          >
            <Icon name="delete" />
            {t("common.delete")}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
