"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const categories = [
  { id: "all", label: "All", icon: "apps" },
  { id: "diseases", label: "Diseases", icon: "coronavirus" },
  { id: "pests", label: "Pests", icon: "bug_report" },
  { id: "nutrients", label: "Nutrients", icon: "science" },
  { id: "practices", label: "Practices", icon: "agriculture" },
];

const articles = [
  {
    id: "1",
    title: "Fall Armyworm — Identification & Control",
    category: "pests",
    crop: "Maize",
    summary: "Learn to identify fall armyworm larvae, recognize damage patterns, and implement effective chemical and organic control strategies.",
    icon: "bug_report",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Early Blight in Tomatoes",
    category: "diseases",
    crop: "Tomato",
    summary: "Recognize the characteristic concentric rings of early blight and understand treatment options including fungicide application and cultural practices.",
    icon: "coronavirus",
    readTime: "4 min",
  },
  {
    id: "3",
    title: "Nitrogen Deficiency in Maize",
    category: "nutrients",
    crop: "Maize",
    summary: "Identify yellowing of lower leaves indicating nitrogen deficiency. Learn correct AN/Urea top dressing rates and timing for optimal results.",
    icon: "science",
    readTime: "3 min",
  },
  {
    id: "4",
    title: "Crop Rotation Best Practices",
    category: "practices",
    crop: "General",
    summary: "Understand why rotating maize with legumes (groundnut, soya) improves soil health, breaks disease cycles, and boosts yields.",
    icon: "rotate_right",
    readTime: "4 min",
  },
  {
    id: "5",
    title: "Late Blight in Potatoes",
    category: "diseases",
    crop: "Potato",
    summary: "Recognize the rapid onset of late blight, understand the conditions that favour it, and apply appropriate fungicide sprays.",
    icon: "coronavirus",
    readTime: "5 min",
  },
  {
    id: "6",
    title: "Pfumvudza/Intwasa Planting Method",
    category: "practices",
    crop: "General",
    summary: "Step-by-step guide to the government conservation agriculture programme — land preparation, hole spacing, fertilizer placement, and planting.",
    icon: "agriculture",
    readTime: "6 min",
  },
  {
    id: "7",
    title: "Aphid Control in Vegetables",
    category: "pests",
    crop: "Vegetables",
    summary: "Identify aphid infestations on cabbage, spinach, and tomato. Natural and chemical control methods for smallholder farmers.",
    icon: "bug_report",
    readTime: "3 min",
  },
  {
    id: "8",
    title: "Phosphorus & Potassium Deficiency",
    category: "nutrients",
    crop: "General",
    summary: "How to recognize P and K deficiencies in your crops and correct them with appropriate Compound D basal and foliar applications.",
    icon: "science",
    readTime: "4 min",
  },
  {
    id: "9",
    title: "Tobacco Mosaic Virus",
    category: "diseases",
    crop: "Tobacco",
    summary: "Understand how TMV spreads through contact, recognize mosaic leaf patterns, and implement prevention through hygiene and resistant varieties.",
    icon: "coronavirus",
    readTime: "4 min",
  },
  {
    id: "10",
    title: "Post-Harvest Handling & Storage",
    category: "practices",
    crop: "General",
    summary: "Reduce post-harvest losses with proper drying, grading, and storage techniques. Prevent aflatoxin contamination in groundnuts and maize.",
    icon: "warehouse",
    readTime: "5 min",
  },
];

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCat = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
      {/* Header */}
      <header className="p-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold leading-tight">Knowledge Base</h1>
            <p className="text-xs text-slate-500">{articles.length} articles • Offline</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="px-6 mt-4 mb-4">
        <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-3 border border-slate-200 dark:border-white/10 input-glow">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            type="text"
            placeholder="Search diseases, pests, tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shrink-0 transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-background-dark"
                  : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 space-y-3">
        {filtered.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge-base/${article.id}`}
            className="block bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 card-interactive"
          >
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{article.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-1">{article.title}</p>
                <p className="text-xs text-slate-500 line-clamp-2">{article.summary}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">
                    {article.crop}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{article.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
            <p className="text-sm text-slate-400 mt-2">No articles found</p>
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}
