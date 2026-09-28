import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentView from "@/components/TreatmentView";
import { CONDITIONS, getCondition } from "@/lib/library";

// Every condition is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITIONS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Treatment: ${getCondition(id)?.name ?? "Not found"}` };
}

export default async function TreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getCondition(id)) notFound();
  return <TreatmentView id={id} />;
}
