import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import PageHeader, { HeaderIconLink } from "@/components/PageHeader";
import { Icon } from "@/components/ui";
import { CONDITIONS, SEVERITY_LABEL, cropLabel, getCondition } from "@/lib/library";

// Every article is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITIONS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Treatment: ${getCondition(id)?.name ?? "Not found"}` };
}

const BANNER = {
  high: "bg-rose-600 text-white",
  medium: "bg-amber-500 text-white",
  low: "bg-sky-600 text-white",
};

export default async function TreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCondition(id);
  if (!c) notFound();

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title="Treatment Plan"
        subtitle={`${c.name} · ${c.crops.map(cropLabel).join(", ")}`}
        backHref="/crop-doctor"
        rightAction={<HeaderIconLink href={`/knowledge-base/${c.id}`} icon="menu_book" label="Read more" />}
      />

      <section className="px-4 mt-4 mb-6">
        <div className={`p-4 rounded-2xl flex items-center gap-3 card ${BANNER[c.severity]}`}>
          <div className="size-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <Icon name="priority_high" className="text-2xl" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">
              Severity: {SEVERITY_LABEL[c.severity]}
            </p>
            <p className="text-sm font-bold">{c.urgency}</p>
          </div>
        </div>
      </section>

      <section className="px-4 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-display">
          <Icon name="checklist" className="text-brand text-lg" />
          First steps
        </h2>
        <ol className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 card">
          {c.firstSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-3">
              <span className="size-6 rounded-full bg-primary text-background-dark text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {c.chemical && (
        <section className="px-4 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-display">
            <Icon name="science" className="text-brand text-lg" />
            Chemical control
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden card">
            <dl className="p-5 space-y-4">
              <div>
                <dt className="text-[10px] font-bold uppercase text-slate-500 mb-1">Active ingredients to look for</dt>
                <dd className="text-sm font-bold">{c.chemical.activeIngredients}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase text-slate-500 mb-1">How to apply</dt>
                <dd className="text-sm">{c.chemical.application}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase text-slate-500 mb-1">When</dt>
                <dd className="text-sm">{c.chemical.timing}</dd>
              </div>
            </dl>
            <div className="bg-amber-50 dark:bg-amber-500/10 p-4 border-t border-amber-200 dark:border-amber-500/20 flex items-start gap-2">
              <Icon name="warning" className="text-amber-600 text-lg mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300">Safety</p>
                <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">{c.chemical.safety}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {c.organic.length > 0 && (
        <section className="px-4 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-display">
            <Icon name="eco" className="text-brand text-lg" />
            Organic &amp; traditional options
          </h2>
          <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/10 card">
            {c.organic.map((m) => (
              <div key={m.name} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-bold">{m.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{m.how}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-display">
          <Icon name="shield" className="text-brand text-lg" />
          Prevent it next time
        </h2>
        <ul className="space-y-2">
          {c.prevention.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card"
            >
              <Icon name="check" className="text-brand text-lg mt-0.5" />
              <p className="text-sm text-slate-700 dark:text-slate-300">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 space-y-2">
        <Link
          href="/agro-dealers"
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <Icon name="storefront" />
          Find an agro-dealer
        </Link>
        <p className="text-xs text-slate-500 text-center pt-2">
          General guidance only. Always follow the product label and your AGRITEX extension officer&apos;s advice.
        </p>
      </section>

      <BottomNav />
    </div>
  );
}
