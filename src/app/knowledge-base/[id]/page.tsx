import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { Icon } from "@/components/ui";
import {
  CONDITIONS,
  CONDITION_TYPE_LABEL,
  GUIDES,
  SEVERITY_LABEL,
  cropLabel,
  getCondition,
  getGuide,
  symptomLabel,
} from "@/lib/library";

// Every article is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...CONDITIONS, ...GUIDES].map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getCondition(id)?.name ?? getGuide(id)?.title ?? "Article" };
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="px-4 mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-display">
        <Icon name={icon} className="text-brand text-lg" />
        {title}
      </h2>
      <div className="bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 card">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-2.5 text-sm">
          <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
          {p}
        </li>
      ))}
    </ul>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const condition = getCondition(id);
  const guide = getGuide(id);
  if (!condition && !guide) notFound();

  if (guide) {
    return (
      <div className="min-h-dvh pb-28">
        <PageHeader title={guide.title} subtitle="Farming guide" backHref="/knowledge-base" />
        <p className="px-4 mt-5 mb-6 text-base text-slate-700 dark:text-slate-300 leading-relaxed">{guide.summary}</p>
        {guide.sections.map((s) => (
          <Section key={s.heading} title={s.heading} icon={guide.icon}>
            <Bullets items={s.points} />
          </Section>
        ))}
        <BottomNav />
      </div>
    );
  }

  const c = condition!;
  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={c.name}
        subtitle={`${CONDITION_TYPE_LABEL[c.type]} · ${c.crops.map(cropLabel).join(", ")}`}
        backHref="/knowledge-base"
      />
      <div className="px-4 mt-5 mb-6">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-brand mb-3">
          {SEVERITY_LABEL[c.severity]} threat
        </span>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{c.summary}</p>
      </div>

      <Section title="Signs to look for" icon="visibility">
        <Bullets items={c.symptoms.map(symptomLabel)} />
      </Section>

      <Section title="What to do" icon="checklist">
        <Bullets items={c.firstSteps} />
      </Section>

      <Section title="Prevention" icon="shield">
        <Bullets items={c.prevention} />
      </Section>

      <section className="px-4 grid grid-cols-2 gap-2">
        <Link
          href={`/treatments/${c.id}`}
          className="bg-primary text-background-dark font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <Icon name="medication" />
          Treatment plan
        </Link>
        <Link
          href="/crop-doctor"
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name="photo_camera" />
          Check a plant
        </Link>
      </section>

      <BottomNav />
    </div>
  );
}
