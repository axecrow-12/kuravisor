"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { EnglishOnlyNote, Icon } from "@/components/ui";
import { useT, type MessageKey } from "@/lib/i18n";
import { CONDITIONS, GUIDES, type ConditionType } from "@/lib/library";

type Category = "all" | ConditionType | "practice";

const CATEGORY_TABS: { id: Category; label: MessageKey; icon: string }[] = [
  { id: "all", label: "common.all", icon: "apps" },
  { id: "pest", label: "kb.pests", icon: "bug_report" },
  { id: "disease", label: "kb.diseases", icon: "coronavirus" },
  { id: "nutrient", label: "kb.nutrients", icon: "science" },
  { id: "practice", label: "kb.practices", icon: "agriculture" },
];

const ICON: Record<Category, string> = {
  all: "apps",
  pest: "bug_report",
  disease: "coronavirus",
  nutrient: "science",
  practice: "agriculture",
};

const ARTICLES = [
  ...CONDITIONS.map((c) => ({
    id: c.id,
    title: c.name,
    category: c.type as Category,
    icon: ICON[c.type],
    summary: c.summary,
    crops: c.crops,
  })),
  ...GUIDES.map((g) => ({
    id: g.id,
    title: g.title,
    category: "practice" as Category,
    icon: g.icon,
    summary: g.summary,
    crops: [] as string[],
  })),
];

export default function KnowledgeBasePage() {
  const { t, crop } = useT();
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(
      (a) =>
        (category === "all" || a.category === category) &&
        (!q ||
          // Match crop names in English and in the chosen language.
          `${a.title} ${a.summary} ${a.crops.join(" ")} ${a.crops.map(crop).join(" ")}`
            .toLowerCase()
            .includes(q)),
    );
  }, [category, query, crop]);

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader title={t("kb.title")} subtitle={t("kb.subtitle", { count: ARTICLES.length })} backHref="/" />

      <section className="px-4 mt-4 mb-3">
        <label className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl px-3 py-3 border border-slate-200 dark:border-white/10 input-glow">
          <Icon name="search" className="text-slate-400" />
          <input
            type="search"
            placeholder={t("kb.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </label>
      </section>

      <section className="px-4 mb-4">
        <EnglishOnlyNote />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shrink-0 transition-colors ${
                category === cat.id
                  ? "bg-primary text-background-dark"
                  : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              }`}
            >
              <Icon name={cat.icon} className="text-base" />
              {t(cat.label)}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 space-y-3">
        {filtered.map((a) => (
          <Link
            key={a.id}
            href={`/knowledge-base/${a.id}`}
            className="flex items-start gap-3 bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <div className="size-10 rounded-xl bg-primary/10 text-brand flex items-center justify-center shrink-0">
              <Icon name={a.icon} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold mb-1">{a.title}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{a.summary}</p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {(a.crops.length ? a.crops.map(crop) : [t("kb.guide")]).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Icon name="search_off" className="text-4xl text-slate-400" />
            <p className="text-sm text-slate-500 mt-2">{t("kb.noResults")}</p>
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}
