"use client";

import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader, { HeaderIconLink } from "@/components/PageHeader";
import ScanRow, { scanOutcome } from "@/components/ScanRow";
import { EmptyState } from "@/components/ui";
import { useT, type MessageKey } from "@/lib/i18n";
import { useAppState } from "@/lib/store";

type Outcome = "all" | "problems" | "healthy";

const OUTCOME_LABEL: Record<Outcome, MessageKey> = {
  all: "history.allResults",
  problems: "history.problems",
  healthy: "scan.healthy",
};

export default function ScanHistoryPage() {
  const { scans } = useAppState();
  const { t, crop: cropName } = useT();
  const [crop, setCrop] = useState("all");
  const [outcome, setOutcome] = useState<Outcome>("all");

  const crops = useMemo(() => [...new Set(scans.map((s) => s.crop))], [scans]);
  const filtered = scans.filter((s) => {
    if (crop !== "all" && s.crop !== crop) return false;
    const healthy = scanOutcome(s, t).tone === "good";
    return outcome === "all" || (outcome === "healthy" ? healthy : !healthy);
  });
  const problems = scans.filter((s) => scanOutcome(s, t).tone !== "good").length;

  const chip = (active: boolean) =>
    `px-4 py-2 text-xs font-bold rounded-full shrink-0 transition-colors ${
      active
        ? "bg-primary text-background-dark"
        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
    }`;

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={t("history.title")}
        subtitle={scans.length ? t("history.subtitle", { count: scans.length, problems }) : t("history.subtitleEmpty")}
        backHref="/crop-doctor"
        rightAction={<HeaderIconLink href="/crop-doctor" icon="add_a_photo" label={t("results.newCheck")} primary />}
      />

      {scans.length === 0 ? (
        <div className="px-4 mt-6">
          <EmptyState
            icon="photo_camera"
            title={t("history.emptyTitle")}
            text={t("history.emptyText")}
            action={{ href: "/crop-doctor", label: t("home.checkPlant"), icon: "photo_camera" }}
          />
        </div>
      ) : (
        <>
          <section className="px-4 mt-4 mb-4 space-y-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {(["all", "problems", "healthy"] as Outcome[]).map((o) => (
                <button key={o} type="button" aria-pressed={outcome === o} onClick={() => setOutcome(o)} className={chip(outcome === o)}>
                  {t(OUTCOME_LABEL[o])}
                </button>
              ))}
            </div>
            {crops.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <button type="button" aria-pressed={crop === "all"} onClick={() => setCrop("all")} className={chip(crop === "all")}>
                  {t("history.allCrops")}
                </button>
                {crops.map((c) => (
                  <button key={c} type="button" aria-pressed={crop === c} onClick={() => setCrop(c)} className={chip(crop === c)}>
                    {cropName(c)}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="px-4 space-y-2">
            {filtered.map((scan) => (
              <ScanRow key={scan.id} scan={scan} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-10">{t("history.noMatches")}</p>
            )}
          </section>
        </>
      )}

      <BottomNav />
    </div>
  );
}
