import Link from "next/link";
import { Icon } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center topo-pattern">
      <div className="size-16 rounded-full bg-primary/15 text-brand flex items-center justify-center mb-4">
        <Icon name="wrong_location" className="text-3xl" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-sm text-slate-500 mb-6">This page doesn&apos;t exist or has moved.</p>
      <Link href="/" className="bg-primary text-background-dark font-bold px-6 py-3 rounded-xl btn-glow">
        Go home
      </Link>
    </div>
  );
}
