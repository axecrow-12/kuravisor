import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/ArticleView";
import { CONDITIONS, GUIDES, getCondition, getGuide } from "@/lib/library";

// Every article is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...CONDITIONS, ...GUIDES].map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getCondition(id)?.name ?? getGuide(id)?.title ?? "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getCondition(id) && !getGuide(id)) notFound();
  return <ArticleView id={id} />;
}
