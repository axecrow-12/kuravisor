"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { Icon, LibraryNotice } from "@/components/ui";
import { useLibrary, useT } from "@/lib/i18n";
import { getCondition, getGuide } from "@/lib/library";

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

export default function ArticleView({ id }: { id: string }) {
  const { t, crop } = useT();
  const lib = useLibrary();
  const baseCondition = getCondition(id);
  const baseGuide = getGuide(id);
  const condition = baseCondition && lib.condition(baseCondition);
  const guide = baseGuide && lib.guide(baseGuide);

  if (guide) {
    return (
      <div className="min-h-dvh pb-28">
        <PageHeader title={guide.title} subtitle={t("kb.guide")} backHref="/knowledge-base" />
        <LibraryNotice lib={lib} className="mx-4 mt-4" />
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
        subtitle={`${t(`type.${c.type}`)} · ${c.crops.map(crop).join(", ")}`}
        backHref="/knowledge-base"
      />
      <LibraryNotice lib={lib} className="mx-4 mt-4" />
      <div className="px-4 mt-5 mb-6">
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-brand mb-3">
          {t("kb.threat", { level: t(`severity.${c.severity}`) })}
        </span>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{c.summary}</p>
      </div>

      <Section title={t("kb.signs")} icon="visibility">
        <Bullets items={c.symptoms.map(lib.symptom)} />
      </Section>

      <Section title={t("results.whatToDo")} icon="checklist">
        <Bullets items={c.firstSteps} />
      </Section>

      <Section title={t("treatment.prevention")} icon="shield">
        <Bullets items={c.prevention} />
      </Section>

      <section className="px-4 grid grid-cols-2 gap-2">
        <Link
          href={`/treatments/${c.id}`}
          className="bg-primary text-on-primary font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-glow"
        >
          <Icon name="medication" />
          {t("treatment.title")}
        </Link>
        <Link
          href="/crop-doctor"
          className="bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Icon name="photo_camera" />
          {t("home.checkPlant")}
        </Link>
      </section>

      <BottomNav />
    </div>
  );
}
