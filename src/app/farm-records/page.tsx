"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Money from "@/components/Money";
import PageHeader, { HeaderIconLink } from "@/components/PageHeader";
import RecordRow from "@/components/RecordRow";
import { EmptyState, SectionTitle } from "@/components/ui";
import { computeTotals, pick, sortRecordsNewestFirst } from "@/lib/farm";
import { formatNumber } from "@/lib/format";
import { useAppState, type RecordType } from "@/lib/store";

type Filter = "all" | RecordType;

export default function FarmRecordsPage() {
  const { plots, records, settings } = useAppState();
  const currency = settings.currency;
  const [filter, setFilter] = useState<Filter>("all");

  const totals = useMemo(() => computeTotals(records), [records]);
  const byPlot = useMemo(() => {
    const m = new Map<string, typeof records>();
    for (const r of records) m.set(r.plotId, [...(m.get(r.plotId) ?? []), r]);
    return m;
  }, [records]);
  const recent = useMemo(
    () => sortRecordsNewestFirst(filter === "all" ? records : records.filter((r) => r.type === filter)).slice(0, 12),
    [records, filter],
  );
  const plotName = (id: string) => plots.find((p) => p.id === id)?.name ?? "Deleted plot";

  const sortedPlots = [...plots].sort(
    (a, b) => (a.status === b.status ? a.name.localeCompare(b.name) : a.status === "active" ? -1 : 1),
  );
  const active = plots.filter((p) => p.status === "active").length;
  const profit = pick(totals.profit, currency);

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title="Farm Records"
        subtitle={
          plots.length
            ? `${plots.length} plot${plots.length === 1 ? "" : "s"} · ${active} active`
            : "Track money and harvests per plot"
        }
        rightAction={
          <>
            <HeaderIconLink href="/farm-records/plots/new" icon="add_location_alt" label="New plot" />
            {plots.length > 0 && (
              <HeaderIconLink href="/farm-records/add" icon="add" label="Add record" primary />
            )}
          </>
        }
      />

      {plots.length === 0 ? (
        <div className="px-4 mt-6">
          <EmptyState
            icon="potted_plant"
            title="No plots yet"
            text="Add each field or garden you farm. Then record what you spend, sell and harvest on it to see your profit."
            action={{ href: "/farm-records/plots/new", label: "Add your first plot", icon: "add" }}
          />
        </div>
      ) : (
        <>
          <section className="px-4 mt-4 mb-6 grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Spent</p>
              <p className="text-lg font-bold text-rose-600 dark:text-rose-400 leading-tight">
                <Money totals={totals.expenses} currency={currency} />
              </p>
            </div>
            <div className="bg-white dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Earned</p>
              <p className="text-lg font-bold text-brand leading-tight">
                <Money totals={totals.income} currency={currency} />
              </p>
            </div>
            <div
              className={`p-3 rounded-2xl text-center ${
                profit >= 0 ? "bg-primary text-background-dark glow" : "bg-rose-600 text-white"
              }`}
            >
              <p className="text-[10px] font-bold uppercase opacity-70 mb-1">Profit</p>
              <p className="text-lg font-bold leading-tight">
                <Money totals={totals.profit} currency={currency} subClassName="text-[11px] opacity-70" />
              </p>
            </div>
          </section>

          <section className="px-4 mb-7">
            <SectionTitle>Plots</SectionTitle>
            <div className="space-y-3">
              {sortedPlots.map((plot) => {
                const t = computeTotals(byPlot.get(plot.id) ?? []);
                const net = pick(t.profit, currency);
                return (
                  <Link
                    key={plot.id}
                    href={`/farm-records/plots/${plot.id}`}
                    className="block bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <p className="font-bold truncate">{plot.name}</p>
                        <p className="text-xs text-slate-500">
                          {plot.crop} · {formatNumber(plot.sizeHa, 2)} ha · {plot.season}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full shrink-0 ${
                          plot.status === "active"
                            ? "bg-primary/15 text-brand"
                            : "bg-slate-100 dark:bg-white/10 text-slate-500"
                        }`}
                      >
                        {plot.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Spent</p>
                        <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                          <Money totals={t.expenses} currency={currency} />
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Earned</p>
                        <p className="text-sm font-bold text-brand">
                          <Money totals={t.income} currency={currency} />
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Net</p>
                        <p className={`text-sm font-bold ${net >= 0 ? "text-brand" : "text-rose-600 dark:text-rose-400"}`}>
                          <Money totals={t.profit} currency={currency} signed />
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="px-4 mb-6">
            <SectionTitle>Recent records</SectionTitle>
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
              {(["all", "expense", "income", "harvest"] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 capitalize transition-colors ${
                    filter === f
                      ? "bg-primary text-background-dark"
                      : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                  }`}
                >
                  {f === "all" ? "All" : `${f}s`}
                </button>
              ))}
            </div>
            {recent.length === 0 ? (
              <EmptyState
                icon="receipt_long"
                title="Nothing recorded yet"
                text="Add seeds, fertilizer, labour, sales and harvests as they happen."
                action={{ href: "/farm-records/add", label: "Add a record", icon: "add" }}
              />
            ) : (
              <div className="space-y-2">
                {recent.map((r) => (
                  <RecordRow key={r.id} record={r} subtitle={plotName(r.plotId)} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <BottomNav />
    </div>
  );
}
