"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useT, type Translator } from "@/lib/i18n";
import { getCondition, localizeCondition } from "@/lib/library";
import type { Language, Scan } from "@/lib/store";
import { Icon } from "./ui";

export function scanOutcome(scan: Scan, t: Translator, lang: Language = "en") {
  if (scan.symptoms.length === 0) return { label: t("scan.healthy"), tone: "good" as const };
  const top = scan.matches[0] && getCondition(scan.matches[0].id);
  if (!top) return { label: t("scan.noMatch"), tone: "unknown" as const };
  return { label: localizeCondition(top, lang).name, tone: top.severity === "high" ? ("bad" as const) : ("warn" as const) };
}

const TONE = {
  good: { icon: "check_circle", badge: "bg-primary/15 text-brand" },
  warn: { icon: "error", badge: "bg-amber-400/15 text-amber-600 dark:text-amber-400" },
  bad: { icon: "warning", badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  unknown: { icon: "help", badge: "bg-slate-200 dark:bg-white/10 text-slate-500" },
};

export default function ScanRow({ scan }: { scan: Scan }) {
  const { t, lang, crop, ago } = useT();
  const outcome = scanOutcome(scan, t, lang);
  const tone = TONE[outcome.tone];
  return (
    <Link
      href={`/crop-doctor/results/${scan.id}`}
      className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
    >
      <div className={`size-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center ${tone.badge}`}>
        {scan.image ? (
          <img alt="" src={scan.image} className="w-full h-full object-cover" />
        ) : (
          <Icon name={tone.icon} className="text-2xl" filled />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {scan.image && <Icon name={tone.icon} className={`text-lg ${tone.badge} bg-transparent`} filled />}
          <p className="font-bold truncate">{outcome.label}</p>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {crop(scan.crop)} · {ago(scan.createdAt)}
        </p>
      </div>
      <Icon name="chevron_right" className="text-slate-400 shrink-0" />
    </Link>
  );
}
