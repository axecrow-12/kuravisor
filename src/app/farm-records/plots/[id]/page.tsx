"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Money from "@/components/Money";
import PageHeader from "@/components/PageHeader";
import PlotForm from "@/components/PlotForm";
import RecordRow from "@/components/RecordRow";
import { EmptyState, Icon, SectionTitle, Sheet } from "@/components/ui";
import {
  categoryFor,
  computeTotals,
  downloadFile,
  expenseBreakdown,
  pick,
  sortRecordsNewestFirst,
  toCSV,
} from "@/lib/farm";
import { formatMoney, formatNumber } from "@/lib/format";
import { useT } from "@/lib/i18n";
import { actions, useAppState } from "@/lib/store";

export default function PlotPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { plots, records: allRecords, settings } = useAppState();
  const { t, crop, category, unit } = useT();
  const currency = settings.currency;
  const plot = plots.find((p) => p.id === id);
  const [editing, setEditing] = useState(false);

  const records = useMemo(
    () => sortRecordsNewestFirst(allRecords.filter((r) => r.plotId === id)),
    [allRecords, id],
  );
  const totals = useMemo(() => computeTotals(records), [records]);
  const breakdown = useMemo(() => expenseBreakdown(records, currency), [records, currency]);
  const harvests = records.filter((r) => r.type === "harvest");

  if (!plot) {
    return (
      <div className="min-h-dvh pb-28">
        <PageHeader title={t("plot.title")} backHref="/farm-records" />
        <div className="px-4 mt-6">
          <EmptyState
            icon="search_off"
            title={t("plot.notFound")}
            text={t("common.mayBeDeleted")}
            action={{ href: "/farm-records", label: t("plot.backToFarm") }}
          />
        </div>
        <BottomNav />
      </div>
    );
  }

  const spent = pick(totals.expenses, currency);
  const net = pick(totals.profit, currency);
  const perHa = plot.sizeHa > 0 ? net / plot.sizeHa : 0;
  const roi = spent > 0 ? (net / spent) * 100 : null;
  const costPerKg = totals.harvestKg > 0 && spent > 0 ? spent / totals.harvestKg : null;

  function exportCSV() {
    const rows = records.map((r) => ({
      date: r.date,
      type: r.type,
      category: category(r.category, categoryFor(r.type, r.category).label),
      amount: r.amount ?? "",
      currency: r.type === "harvest" ? "" : r.currency,
      quantity: r.quantity ?? "",
      unit: r.unit ? unit(r.unit) : "",
      unit_price: r.unitPrice ?? "",
      notes: r.notes,
    }));
    const safeName = plot!.name.replace(/[^\w]+/g, "-").toLowerCase();
    downloadFile(`kuravisor-${safeName}.csv`, toCSV(rows) || t("plot.noRecordsCsv"), "text/csv");
  }

  function deletePlot() {
    if (!confirm(t("plot.confirmDelete", { name: plot!.name, count: records.length }))) return;
    actions.deletePlot(plot!.id);
    router.replace("/farm-records");
  }

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={plot.name}
        subtitle={`${crop(plot.crop)} · ${formatNumber(plot.sizeHa, 2)} ha · ${plot.season}`}
        backHref="/farm-records"
        rightAction={
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label={t("plot.edit")}
            className="size-10 flex items-center justify-center rounded-full bg-slate-200/60 dark:bg-white/10 icon-btn"
          >
            <Icon name="edit" className="text-xl" />
          </button>
        }
      />

      <section className="px-4 mt-4 mb-6">
        <div
          className={`p-5 rounded-2xl relative overflow-hidden mb-3 ${
            net >= 0 ? "bg-primary text-background-dark glow" : "bg-rose-600 text-white"
          }`}
        >
          <Icon name="agriculture" className="absolute top-2 right-3 text-7xl opacity-15" />
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
            {plot.status === "completed" ? t("plot.finalProfit") : t("plot.profitSoFar")}
          </p>
          <p className="text-4xl font-bold">
            <Money totals={totals.profit} currency={currency} subClassName="text-sm opacity-70" />
          </p>
          <div className="flex gap-6 mt-4 relative">
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">{t("plot.perHectare")}</p>
              <p className="font-bold">{formatMoney(Math.round(perHa), currency)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">{t("plot.return")}</p>
              <p className="font-bold">{roi === null ? "–" : `${Math.round(roi)}%`}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-60">{t("plot.costPerKg")}</p>
              <p className="font-bold">{costPerKg === null ? "–" : formatMoney(costPerKg, currency)}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">{t("plot.totalSpent")}</p>
            <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
              <Money totals={totals.expenses} currency={currency} />
            </p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">{t("plot.totalEarned")}</p>
            <p className="text-xl font-bold text-brand">
              <Money totals={totals.income} currency={currency} />
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 mb-6 grid grid-cols-2 gap-3">
        <Link
          href={`/farm-records/add?plot=${plot.id}`}
          className="bg-primary text-background-dark font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <Icon name="add" />
          {t("farm.addRecord")}
        </Link>
        <button
          type="button"
          onClick={exportCSV}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name="download" />
          {t("plot.exportCsv")}
        </button>
      </section>

      {breakdown.length > 0 && (
        <section className="px-4 mb-6">
          <SectionTitle>{t("plot.moneyWent")}</SectionTitle>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 space-y-3 card">
            {breakdown.map((b) => (
              <div key={b.category.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Icon name={b.category.icon} className="text-base text-slate-500" />
                    {category(b.category.id, b.category.label)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatMoney(b.amount, currency)} ({b.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {harvests.length > 0 && (
        <section className="px-4 mb-6">
          <SectionTitle>
            {t("record.harvests")}{totals.harvestKg > 0 && ` · ${formatNumber(totals.harvestKg, 0)} kg`}
          </SectionTitle>
          <div className="space-y-2">
            {harvests.map((r) => (
              <RecordRow key={r.id} record={r} />
            ))}
          </div>
        </section>
      )}

      <section className="px-4 mb-6">
        <SectionTitle>{t("plot.allRecords", { count: records.length })}</SectionTitle>
        {records.length === 0 ? (
          <EmptyState
            icon="receipt_long"
            title={t("plot.noRecordsTitle")}
            text={t("plot.noRecordsText")}
            action={{ href: `/farm-records/add?plot=${plot.id}`, label: t("farm.addRecord"), icon: "add" }}
          />
        ) : (
          <div className="space-y-2">
            {records.map((r) => (
              <RecordRow
                key={r.id}
                record={r}
                onDelete={() => confirm(t("record.confirmDelete")) && actions.deleteRecord(r.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="px-4 space-y-2">
        <button
          type="button"
          onClick={() =>
            actions.updatePlot(plot.id, { status: plot.status === "active" ? "completed" : "active" })
          }
          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name={plot.status === "active" ? "flag" : "restart_alt"} />
          {plot.status === "active" ? t("plot.markComplete") : t("plot.reopen")}
        </button>
        <button
          type="button"
          onClick={deletePlot}
          className="w-full text-rose-600 dark:text-rose-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name="delete" />
          {t("plot.delete")}
        </button>
      </section>

      <Sheet open={editing} onClose={() => setEditing(false)} title={t("plot.edit")}>
        <PlotForm
          initial={plot}
          submitLabel={t("common.saveChanges")}
          onSubmit={(input) => {
            actions.updatePlot(plot.id, input);
            setEditing(false);
          }}
        />
      </Sheet>

      <BottomNav />
    </div>
  );
}
