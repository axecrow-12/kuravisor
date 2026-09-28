"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { Card, EmptyState, Icon } from "@/components/ui";
import { formatDate, todayISO } from "@/lib/format";
import {
  CONDITION_TYPE_LABEL,
  SEVERITY_LABEL,
  cropLabel,
  getCondition,
  symptomLabel,
} from "@/lib/library";
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
  const scan = scans.find((s) => s.id === id);
  const [reminded, setReminded] = useState(false);

  if (!scan) {
    return (
      <div className="min-h-dvh pb-28">
        <PageHeader title="Scan Results" backHref="/crop-doctor" />
        <div className="px-4 mt-6">
          <EmptyState
            icon="search_off"
            title="Scan not found"
            text="It may have been deleted."
            action={{ href: "/crop-doctor", label: "New check", icon: "photo_camera" }}
          />
        </div>
        <BottomNav />
      </div>
    );
  }

  const healthy = scan.symptoms.length === 0;
  const top = scan.matches[0] ? getCondition(scan.matches[0].id) : undefined;
  const others = scan.matches.slice(1).flatMap((m) => {
    const c = getCondition(m.id);
    return c ? [{ condition: c, score: m.score }] : [];
  });
  const plot = plots.find((p) => p.id === scan.plotId);

  function remind(days: number, title: string) {
    actions.addTask({
      title,
      notes: `${cropLabel(scan!.crop)}${plot ? ` · ${plot.name}` : ""}`,
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
      {reminded ? "Reminder added to Tasks" : `Remind me to check again in ${days} days`}
    </button>
  );

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title="Scan Results"
        subtitle={`${cropLabel(scan.crop)}${plot ? ` · ${plot.name}` : ""} · ${formatDate(scan.createdAt)}`}
        backHref="/crop-doctor"
      />

      {scan.image && (
        <section className="px-4 mt-4">
          <div className="h-52 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-white/10">
            <img alt="Scanned plant" className="w-full h-full object-cover" src={scan.image} />
            <span className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full text-sm font-bold text-background-dark">
              {cropLabel(scan.crop)}
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
                  <p className="text-sm font-bold text-brand">No problems reported</p>
                  <h2 className="text-xl font-bold">Looks healthy</h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                Keep scouting once a week. Early checks catch pests and diseases while they are cheap to control.
              </p>
            </div>
            {reminderButton(7, `Scout ${cropLabel(scan.crop).toLowerCase()} for pests and disease`)}
          </>
        ) : !top ? (
          <>
            <div className="p-5 rounded-2xl border-2 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 bg-slate-200 dark:bg-white/10 text-slate-500 rounded-full flex items-center justify-center">
                  <Icon name="help" className="text-3xl" />
                </div>
                <h2 className="text-xl font-bold">No clear match</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                These signs don&apos;t match a problem in the offline library for {cropLabel(scan.crop).toLowerCase()}.
                Show the plant, or this photo, to your AGRITEX extension officer or an agro-dealer.
              </p>
            </div>
            {reminderButton(3, `Recheck ${cropLabel(scan.crop).toLowerCase()} problem`)}
          </>
        ) : (
          <>
            <div className={`p-5 rounded-2xl border-2 ${SEVERITY_STYLE[top.severity].card}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${SEVERITY_STYLE[top.severity].icon}`}>
                  <Icon name={top.type === "pest" ? "bug_report" : top.type === "disease" ? "coronavirus" : "science"} className="text-3xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Most likely</p>
                  <h2 className="text-xl font-bold leading-tight">{top.name}</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${SEVERITY_STYLE[top.severity].chip}`}>
                  {SEVERITY_LABEL[top.severity]}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 dark:bg-white/10">
                  {CONDITION_TYPE_LABEL[top.type]}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 dark:bg-white/10">
                  {Math.round(scan.matches[0].score * 100)}% sign match
                </span>
              </div>
              <p className="text-sm font-bold mt-3 flex items-center gap-1.5">
                <Icon name="schedule" className="text-lg" />
                {top.urgency}
              </p>
            </div>

            <Card className="p-5">
              <h3 className="text-lg font-bold mb-2">What is this?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{top.summary}</p>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-bold mb-3">What should I do?</h3>
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
                Full treatment plan
              </Link>
              {reminderButton(3, `Recheck ${cropLabel(scan.crop).toLowerCase()} for ${top.name.toLowerCase()}`)}
              <Link
                href="/agro-dealers"
                className="w-full bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
              >
                <Icon name="storefront" />
                Find an agro-dealer
              </Link>
            </div>

            {others.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 mt-2">
                  Could also be
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
                        <p className="text-xs text-slate-500">{CONDITION_TYPE_LABEL[condition.type]}</p>
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 mt-2">Signs you reported</h3>
            <div className="flex flex-wrap gap-2">
              {scan.symptoms.map((s) => (
                <span key={s} className="text-xs bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full">
                  {symptomLabel(s)}
                </span>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-slate-500 flex items-start gap-2 bg-slate-100 dark:bg-white/5 rounded-xl p-3">
          <Icon name="info" className="text-base" />
          This guide is based on the signs you ticked, not a lab test. For serious or spreading problems, confirm with
          your local AGRITEX extension officer.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/crop-doctor"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <Icon name="photo_camera" />
            New check
          </Link>
          <button
            type="button"
            onClick={() => {
              if (!confirm("Delete this scan?")) return;
              actions.deleteScan(scan.id);
              router.replace("/scan-history");
            }}
            className="text-rose-600 dark:text-rose-400 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 border-2 border-rose-200 dark:border-rose-500/20"
          >
            <Icon name="delete" />
            Delete
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
